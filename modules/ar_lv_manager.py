#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: ar_lv_manager.py
    @time: 2016/12/5 16:22
"""
from arpylibs.base_error import ARBaseError
from modules.ar_raid_manager import ARRaidManager, ARRaidStatus
from modules.sqlite_db import conn
from modules.shell_cmd import ShellCmd
from modules.raid_lv import Raidlv
from utils.error.ar_exception import ARLvException
from utils.error.status_pool import LvStatusPool
import re
import os


def deco_deal_excep(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ARBaseError as e:
            raise e
        except Exception:
            raise ARLvException(LvStatusPool.ID_SERVER_ERROR)

    return wrapper


class ARLvStatus(object):
    AVAILABLE = 'available'
    CREATING = 'creating'
    NOT_AVAILABLE = 'NOT available'

    @staticmethod
    def code(status):
        if status == ARLvStatus.AVAILABLE:
            return 0
        elif status == ARLvStatus.NOT_AVAILABLE:
            return 1
        elif status == ARLvStatus.CREATING:
            return 2
        else:
            return 1


class ARLvManager(object):
    def __init__(self):
        cursor = conn.cursor()
        create_table = 'create table if not exists lv ' \
                       '(name varchar(60), lv_type varchar(30))'
        cursor.execute(create_table)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def create_lv(self, lv_name, lv_type, vir_drv_id, lv_capacity):
        lv_name = 'volume_{0}'.format(lv_name.strip())
        lv_names = ARLvManager.get_lv_names()
        if lv_name in lv_names:
            raise ARLvException(LvStatusPool.ID_LV_NAME_HAS_BEEN_USED)

        self.validate_create_lv_capacity(vir_drv_id, lv_capacity)
        raid_name = ARRaidManager().get_raid_name_by_vd(vir_drv_id)['raid_name']
        raid_tag = ARRaidManager().get_raid_tag_by_vd(vir_drv_id)['raid_tag']
        raid_letter = ARRaidManager.get_raid_drive_letter(raid_tag)['drive_letter']
        vg_vgsize = ARRaidManager().get_raid_vg_and_vgsize(raid_name)
        vg = vg_vgsize['vg']
        lv_created = 0
        create = 0

        if vg is None:
            vg_created = ARLvManager.create_raid_vg(raid_letter, raid_name
                                                    )['vg_created']

            if vg_created == 0:
                return {
                    'lv_name': lv_name.split('_')[1],
                    'lv_created': 0
                }

            vg = raid_name

        vgfree = ARRaidManager().get_raid_vg_and_vgsize(raid_name)['vgfree']
        is_equal = ARLvManager.is_equal(lv_capacity, vgfree)['equal']

        '''采用同步的方式返回'''
        if is_equal:
            cmd = 'lvcreate -y -l 100%VG -n {0} {1} &'.format(lv_name, vg)
        else:
            cmd = 'lvcreate -L {0} -n {1} {2} &'.format(lv_capacity, lv_name, vg)

        result = ShellCmd.execute_shell_cmd(cmd)

        if result and result.find('created') != -1:
            create = 1
            self.save_lv_info(lv_name, lv_type)

        volume_dir = '/uservolume/{0}'.format(lv_name)
        lv_mount_dir = self.lv_mount_dir(lv_name, volume_dir)['lv_mount_dir']

        if create == 1 and lv_mount_dir == 1:
            lv_created = 1
            self.write_mount_info_to_fstab(lv_name, volume_dir)

        return {
            'lv_name': lv_name.split('_')[1],
            'lv_created': lv_created
        }

    @deco_deal_excep
    def delete_lv(self, lv_name):
        lv_name = 'volume_{0}'.format(lv_name.strip())
        link_lv_name = self.get_elasticsearch_link_lv()['link_lv_name']

        if link_lv_name and link_lv_name == lv_name:
            raise ARLvException(LvStatusPool.ID_LV_HAS_LINK_DATA_SOURCE)

        lv_vg_capacity_usedcapacity_dir = self.lv_vg_capacity_usedcapacity_dir(lv_name)
        vg = lv_vg_capacity_usedcapacity_dir['vg']
        mount_dir = lv_vg_capacity_usedcapacity_dir['mount_dir']

        if mount_dir:
            cmd = 'umount /dev/{0}/{1}'.format(vg, lv_name)
            ShellCmd.execute_shell_cmd(cmd)
            self.delete_mount_info_from_fstab(lv_name)

        lv_deleted = 0
        cmd = 'lvremove -y /dev/{0}/{1}'.format(vg, lv_name)
        result = ShellCmd.execute_shell_cmd(cmd)

        '''采用同步的方式返回'''
        if result and result.find('successfully removed') != -1:
            self.delete_lv_info(lv_name)
            lv_deleted = 1

        return {
            'lv_name': lv_name.split('_')[1],
            'lv_deleted': lv_deleted
        }

    @deco_deal_excep
    def config_lv(self, lv_name, lv_name_config, lv_capacity, data_source):
        lv_name = 'volume_{0}'.format(lv_name.strip())
        lv_name_config = 'volume_{0}'.format(lv_name_config.strip())
        link_lv_name = self.get_elasticsearch_link_lv()['link_lv_name']

        if link_lv_name and link_lv_name != lv_name:
            raise ARLvException(LvStatusPool.ID_DATA_SOURCE_HAS_BEEN_USED)

        self.validate_config_lv_capacity(lv_name, lv_capacity)
        lv_vg_capacity_usedcapacity_dir = self.lv_vg_capacity_usedcapacity_dir(lv_name)
        mount_dir = lv_vg_capacity_usedcapacity_dir['mount_dir']
        config_lv = 0
        lv_expand = None
        resize_2_fs = None
        migrate_data_make_link = None
        start_anyrobot_store = None
        dose_need_to_expand_lv = self.dose_need_to_expand_lv(lv_name,
                                                             lv_capacity)['dose_need']

        if dose_need_to_expand_lv:
            lv_expand = self.expand_lv_capacity(lv_name, lv_capacity)['lv_expand']

        if mount_dir is not None:
            resize_2_fs = self.expand_fs(lv_name)['resize_2_fs']

        stop_anyrobot_store = ARLvManager.stop_anyrobot_store_service()[
            'stop_anyrobot_store']

        '''停掉容器后，方可进行数据迁移与建立软连接操作'''
        if stop_anyrobot_store == 1:
            if link_lv_name is None:
                migrate_data_make_link = self.migrate_data_and_make_link(
                    lv_name, data_source)['migrate_data_make_link']
                '''
                    考虑到数据量大的情况，数据迁移与建立软连接的操作会非常耗时；
                    所以，这一块采用的是异步机制。异步机制的问题是，可能elasticsearch
                    的配置文件与插件没有拷贝完全，而后紧接着执行启动anyrobot-store容器
                    的操作，则会启动失败。
                    临时处理机制，给8秒钟的数据迁移与建立软连接操作的缓存时间，再启动
                    anyrobot-store容器。后面的处理想法是：尝试只迁移elasticsearch中的data目录，
                    conf与plugins目录不作迁移。
                '''
                import time
                time.sleep(8)

            start_anyrobot_store = ARLvManager.start_anyrobot_store_service()[
                'start_anyrobot_store']

        if lv_name.strip() != lv_name_config.strip():
            '''当前版本不支持修改lv名称，此处代码不会执行'''
            self.modify_lv_name(lv_name, lv_name_config)

        if lv_expand != 0 and resize_2_fs != 0 and stop_anyrobot_store == 1 \
                and migrate_data_make_link != 0 and start_anyrobot_store == 1:
            config_lv = 1

        return {
            'lv_name': lv_name.split('_')[1],
            'lv_expand': lv_expand,
            'resize_2_fs': resize_2_fs,
            'stop_anyrobot_store': stop_anyrobot_store,
            'migrate_data_make_link': migrate_data_make_link,
            'start_anyrobot_store': start_anyrobot_store,
            'config_lv': config_lv
        }

    @deco_deal_excep
    def validate_create_is_done(self, lv_name):
        create_is_done = 0
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        cmd = "ps -ef | grep 'mkfs -t ext3 /dev/{0}/{1} && mkdir' | grep -v grep".\
            format(lv_vg, lv_name)

        result = ShellCmd.execute_shell_cmd(cmd)

        if not result:
            create_is_done = 1

        return {
            'create_is_done': create_is_done
        }

    @deco_deal_excep
    def get_elasticsearch_link_lv(self):
        link_lv_name = None
        store_dir = '/anyrobot/store'
        cmd = 'ls -l {0}'.format(store_dir)
        result = ShellCmd.execute_shell_cmd(cmd)

        if result:
            vals = result.strip().split('\n')
            for val in vals:
                value = re.findall('volume_[a-zA-Z0-9]+', val)
                if value:
                    link_lv_name = value[0]

        return {
            'link_lv_name': link_lv_name
        }

    @deco_deal_excep
    def migrate_data_and_make_link(self, lv_name, data_source):
        """
            迁移大数据量的数据，需要花费很长的时间；
            这里采用异步的方式处理。
        """
        mount_dir = self.lv_vg_capacity_usedcapacity_dir(lv_name
                                                         )['mount_dir']

        migrate_data_make_link = 0

        if mount_dir:
            cmd = 'mv -f {0} {1}/ && ln -s {1}/elasticsearch {0}'.\
                format(data_source, mount_dir)
            proc = ShellCmd.execute_cmd(cmd)

            if not proc.returncode:
                migrate_data_make_link = 1

        return {
            'migrate_data_make_link': migrate_data_make_link
        }

    @deco_deal_excep
    def dose_need_to_expand_lv(self, lv_name, lv_capacity):
        dose_need = 1
        lv_capacity_val = re.findall('^[0-9]+\.?[0-9]*', lv_capacity)[0]
        lvsize = self.get_lvsize_usedsize_by_cmd_lvs(lv_name)['lvsize']
        lvsize_val = re.findall('^[0-9]+\.?[0-9]*', lvsize)[0]

        if lv_capacity.find('TB') != -1:
            lv_capacity_val = float(lv_capacity_val) * 1024

        if lvsize.find('MB') != -1:
            lvsize_val = float(lvsize_val) / 1024
        elif lvsize.find('TB') != -1:
            lvsize_val = float(lvsize_val) * 1024

        if float(lv_capacity_val) == float(lvsize_val):
            dose_need = 0

        return {
            'dose_need': dose_need
        }

    @staticmethod
    def is_equal(value1, value2):
        equal = 0
        value1_unit = re.findall('[A-Z]+', value1)[0]
        value2_unit = re.findall('[A-Z]+', value2)[0]

        if value1_unit == value2_unit:
            value1_val = float(re.findall('^[0-9]+\.?[0-9]*', value1)[0])
            value2_val = float(re.findall('^[0-9]+\.?[0-9]*', value2)[0])

            if value1_val == value2_val:
                equal = 1

        return {
            'equal': equal
        }

    @staticmethod
    def stop_anyrobot_store_service():
        cmd = 'docker stop --time 8 anyrobot-store'
        stop_anyrobot_store = 0
        result = ShellCmd.execute_shell_cmd(cmd)

        if result and result.find('anyrobot-store') != -1:
            stop_anyrobot_store = 1

        return {
            'stop_anyrobot_store': stop_anyrobot_store
        }

    @staticmethod
    def start_anyrobot_store_service():
        cmd = 'docker start anyrobot-store'
        start_anyrobot_store = 0
        result = ShellCmd.execute_shell_cmd(cmd)

        if result and result.find('anyrobot-store') != -1:
            start_anyrobot_store = 1

        return {
            'start_anyrobot_store': start_anyrobot_store
        }

    @staticmethod
    def estimate_elasticsearch_is_link():
        elasticsearch_dir = '/anyrobot/store/elasticsearch'
        elasticsearch_is_link = 0

        if os.path.islink(elasticsearch_dir):
            elasticsearch_is_link = 1

        return {
            'elasticsearch_is_link': elasticsearch_is_link
        }

    @deco_deal_excep
    def validate_create_lv_capacity(self, vir_drv_id, lv_capacity):
        lv_capacity_val = re.findall('^[0-9]+\.?[0-9]*', lv_capacity)[0]

        if float(lv_capacity_val) <= 0:
            raise ARLvException(LvStatusPool.ID_INVALID_LV_CAPACITY)

        raid_name = ARRaidManager().get_raid_name_by_vd(vir_drv_id)['raid_name']
        vgfree = ARRaidManager().get_raid_vg_and_vgsize(raid_name)['vgfree']

        if not vgfree:
            vgfree = ARRaidManager().get_raid_size(vir_drv_id)

        if vgfree:
            vgfree_val = re.findall('^[0-9]+\.?[0-9]*', vgfree)[0]

            if lv_capacity.find('TB') != -1:
                lv_capacity_val = float(lv_capacity_val) * 1024

            if vgfree.find('TB') != -1:
                vgfree_val = float(vgfree_val) * 1024
            elif vgfree.find('MB') != -1:
                vgfree_val = float(vgfree_val) / 1024

            if float(lv_capacity_val) > float(vgfree_val):
                raise ARLvException(LvStatusPool.ID_INVALID_LV_CAPACITY)

    @deco_deal_excep
    def validate_config_lv_capacity(self, lv_name, lv_capacity):
        lv_capacity_val = re.findall('^[0-9]+\.?[0-9]*', lv_capacity)[0]
        lvsize = self.get_lvsize_usedsize_by_cmd_lvs(lv_name)['lvsize']
        lvsize_val = re.findall('^[0-9]+\.?[0-9]*', lvsize)[0]
        lv_vgfree = self.get_vgsize_vgfree_about_lv(lv_name)['lv_vgfree']
        lv_vgfree_val = re.findall('^[0-9]+\.?[0-9]*', lv_vgfree)[0]

        if lv_capacity.find('TB') != -1:
            lv_capacity_val = float(lv_capacity_val) * 1024

        if lvsize.find('MB') != -1:
            lvsize_val = float(lvsize_val) / 1024
        elif lvsize.find('TB') != -1:
            lvsize_val = float(lvsize_val) * 1024

        if lv_vgfree.find('MB') != -1:
            lv_vgfree_val = float(lv_vgfree_val) / 1024
        elif lv_vgfree.find('TB') != -1:
            lv_vgfree_val = float(lv_capacity_val) * 1024

        lv_max_size_val = float(lvsize_val) + float(lv_vgfree_val)

        if float(lv_capacity_val) < float(lvsize_val) or float(
                lv_capacity_val) > float(lv_max_size_val):
            raise ARLvException(LvStatusPool.ID_INVALID_LV_CAPACITY)

    @deco_deal_excep
    def mount_other_dir(self, lv_name, directory):
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        lv_path = '/dev/{0}/{1}'.format(lv_vg, lv_name)
        cmd = 'umount {0} && mkdir -p {1} && mount {0} {1}'.\
            format(lv_path, directory)
        proc = ShellCmd.execute_cmd(cmd)
        lv_mount_dir = 0

        if not proc.returncode:
            lv_mount_dir = 1

        return {
            'lv_mount_dir': lv_mount_dir
        }

    @deco_deal_excep
    def expand_lv_capacity(self, lv_name, lv_capacity):
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        lv_expand = 0
        cmd = "lvresize -L {0} /dev/{1}/{2}".\
            format(lv_capacity, lv_vg, lv_name)
        result = ShellCmd.execute_shell_cmd(cmd)

        if result and result.find('successfully resized') != -1:
            lv_expand = 1

        return {
            'lv_name': lv_name,
            'lv_expand': lv_expand
        }

    @deco_deal_excep
    def lv_mount_dir(self, lv_name, directory):
        """
            对逻辑卷进行格式化操作，非常耗时；逻辑卷容量越大，
            需要的时间越长。
            此处，采用异步的方式处理。
        """
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        lv_path = '/dev/{0}/{1}'.format(lv_vg, lv_name)

        cmd = "mkfs -t ext3 {0} && " \
              "mkdir -p {1} && " \
              "mount {0} {1}".format(lv_path, directory)
        proc = ShellCmd.execute_cmd(cmd)
        lv_mount_dir = 0

        if not proc.returncode:
            lv_mount_dir = 1

        return {
            'lv_mount_dir': lv_mount_dir
        }

    @deco_deal_excep
    def write_mount_info_to_fstab(self, lv_name, directory):
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        mount_info = "/dev/mapper/{0}-{1} {2} ext3 defaults 0 0".\
            format(lv_vg, lv_name, directory)
        cmd = 'echo {0} >> /etc/fstab'.format(mount_info)
        proc = ShellCmd.execute_cmd(cmd)
        write_mount_dir_to_fstab = 0

        if not proc.returncode:
            write_mount_dir_to_fstab = 1

        return {
            'write_mount_dir_to_fstab': write_mount_dir_to_fstab
        }

    @deco_deal_excep
    def delete_mount_info_from_fstab(self, lv_name):
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        cmd = "sed -i '/\/dev\/mapper\/{0}-{1}/d' /etc/fstab".format(lv_vg, lv_name)
        proc = ShellCmd.execute_cmd(cmd)
        delete_mount_info_from_fstab = 0

        if not proc.returncode:
            delete_mount_info_from_fstab = 1

        return {
            'delete_mount_info_from_fstab': delete_mount_info_from_fstab
        }

    @deco_deal_excep
    def expand_fs(self, lv_name):
        """
            扩展文件系统，需要耗费一些时间，
            使用异步的方式处理。
        """
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        lv_path = '/dev/{0}/{1}'.format(lv_vg, lv_name)
        resize_2_fs = 0
        cmd = 'resize2fs {0}'.format(lv_path)
        proc = ShellCmd.execute_cmd(cmd)

        if not proc.returncode:
            resize_2_fs = 1

        return {
            'resize_2_fs': resize_2_fs
        }

    @deco_deal_excep
    def get_vgsize_vgfree_about_lv(self, lv_name):
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        cmd = "vgs | grep %s | awk '{print $6,$7}'" % lv_vg
        result = ShellCmd.execute_shell_cmd(cmd)
        lv_vgsize = None
        lv_vgfree = None

        if result:
            vals = result.split(' ')
            lv_vgsize = Raidlv.size_patter(vals[0].strip())
            lv_vgfree = Raidlv.size_patter(vals[1].strip())

        return {
            'lv_vgsize': lv_vgsize,
            'lv_vgfree': lv_vgfree
        }

    @staticmethod
    def create_raid_vg(raid_drive_letter, raid_name):
        cmd = "parted -s {0} mklabel gpt &&" \
              "parted -s {0} mkpart primary 0 20% &&" \
              "parted -s {0} mkpart primary 20% 40% &&" \
              "parted -s {0} mkpart primary 40% 60% &&" \
              "parted -s {0} mkpart primary 60% 80% &&" \
              "parted -s {0} mkpart primary 80% 100% &&" \
              "parted -s {0} toggle 1 lvm &&" \
              "parted -s {0} toggle 2 lvm &&" \
              "parted -s {0} toggle 3 lvm &&" \
              "parted -s {0} toggle 4 lvm &&" \
              "parted -s {0} toggle 5 lvm &&" \
              "partprobe {0}{2} &&" \
              "pvcreate -y {0}{2} &&" \
              "vgcreate -s 4M {1} {0}{2}".format(raid_drive_letter, raid_name,
                                                 '{1,2,3,4,5}')
        vg_created = 0
        result = ShellCmd.execute_shell_cmd(cmd)

        if result.find('successfully created') != -1:
            vg_created = 1

        return {
            'raid_name': raid_name,
            'vg_created': vg_created
        }

    @deco_deal_excep
    def lv_vg_capacity_usedcapacity_dir(self, lv_name):
        """
            vg与raid名称保持一致
        """
        vg = self.get_lv_vg(lv_name)['lv_vg']
        file_system = "/dev/mapper/{0}-{1}".format(vg, lv_name)
        cmd = "df -h | grep {0}".format(file_system)
        result = ShellCmd.execute_shell_cmd(cmd)
        lv_capacity = None
        lv_used_capacity = None
        lv_available_capacity = None
        lv_used_percent = None
        mount_dir = None

        if result:
            results = result.split(' ')
            vals = []
            for res in results:
                if res:
                    vals.append(res.strip())

            if len(vals) == 6:
                lv_capacity = ARLvManager.mount_of_lv_size_patter(vals[1])
                lv_used_capacity = ARLvManager.mount_of_lv_size_patter(vals[2])
                lv_available_capacity = ARLvManager.mount_of_lv_size_patter(vals[3])
                lv_used_percent = vals[4].split('%')[0]
                mount_dir = vals[-1]

        return {
            'lv_name': lv_name,
            'vg': None if not vg else vg,
            'lv_capacity': lv_capacity,
            'lv_used_capacity': lv_used_capacity,
            'lv_available_capacity': lv_available_capacity,
            'lv_used_percent': lv_used_percent,
            'mount_dir': mount_dir
        }

    @staticmethod
    def mount_of_lv_size_patter(size):
        result = None

        if size.find('K') != -1:
            result = size.replace('K', ' KB')
        elif size.find('M') != -1:
            result = size.replace('M', ' MB')
        elif size.find('G') != -1:
            result = size.replace('G', ' GB')
        elif size.find('T') != -1:
            result = size.replace('T', ' TB')

        return result

    @deco_deal_excep
    def get_lv_vg(self, lv_name):
        lv_names = ARLvManager.get_lv_names()
        if lv_name not in lv_names:
            raise ARLvException(LvStatusPool.ID_LV_NOT_FOUND)

        cmd = "lvdisplay | grep -E 'LV Name|VG Name'"
        results = ShellCmd.execute_shell_cmd(cmd)
        lv_vg = None

        if results:
            values = results.split('\n')
            vals = []
            for val in values:
                if val:
                    vals.append(val.strip())

            pattern = 'LV Name.*{0}'.format(lv_name)
            lv_vg_index = 0
            for val in vals:
                if re.match(pattern, val):
                    lv_vg_index = vals.index(val) + 1
                    break

            lv_vg = vals[lv_vg_index].split(' ')[-1]

        return {
            'lv_vg': lv_vg
        }

    @deco_deal_excep
    def modify_lv_name(self, lv_name, lv_name_config):
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        mount_dir = self.lv_vg_capacity_usedcapacity_dir(lv_name)['mount_dir']
        modify_lv_name = 0
        info = 'Renamed "{0}" to "{1}" in volume group "{2}"'.\
            format(lv_name, lv_name_config, lv_vg)

        if mount_dir is None:
            cmd = 'lvrename /dev/{0}/{1} /dev/{0}/{2}'.\
                format(lv_vg, lv_name, lv_name_config)
            result = ShellCmd.execute_shell_cmd(cmd)

            if result and result.find(info) != -1:
                modify_lv_name = 1
                self.update_lv_info(lv_name, lv_name_config)
        else:
            cmd = 'umount /dev/{0}/{1} && ' \
                  'lvrename /dev/{0}/{1} /dev/{0}/{2} && ' \
                  'mount /dev/{0}/{2} {3}'.\
                format(lv_vg, lv_name, lv_name_config, mount_dir)
            result = ShellCmd.execute_shell_cmd(cmd)

            if result and result.find(info) != -1:
                modify_lv_name = 1
                self.update_lv_info(lv_name, lv_name_config)

        return {
            'modify_lv_name': modify_lv_name
        }

    @deco_deal_excep
    def get_lv_status(self, lv_name):
        """
            逻辑卷的状态依赖于所在的raid的状态。
            当raid在重建时，尽可能少的执行MegaCli命令，以此来提升接口访问速度。
            这里将 has_raid_recon 判断放在此处执行。
        """
        lv_names = ARLvManager.get_lv_names()
        if lv_name not in lv_names:
            raise ARLvException(LvStatusPool.ID_LV_NOT_FOUND)

        raid_name = self.get_lv_vg(lv_name)['lv_vg']
        raid_id = ARRaidManager().get_raid_id_by_name(raid_name)['vir_drv_id']
        raid_status = None
        has_raid_recon = 0

        if raid_id:
            is_recon = ARRaidManager().get_raid_recon_info(raid_id)['is_recon']
            if is_recon:
                raid_status = ARRaidStatus.RECONSTRUCTING
                has_raid_recon = 1
            else:
                raid_status = ARRaidManager().get_raid_state_size_stripsz(
                    raid_id)['raid_state']

        cmd = "lvdisplay |grep -E 'LV Name|LV Status'|grep -A1 %s |grep 'LV Status'" \
              " |awk '{print $3}'" % lv_name

        result = ShellCmd.execute_shell_cmd(cmd)
        lv_status = None

        if result:
            vals = result.strip().split('\n')
            if vals:
                if not raid_status or raid_status == ARRaidStatus.OFFLINE:
                    lv_status = ARLvStatus.code(ARLvStatus.NOT_AVAILABLE)
                else:
                    lv_status = ARLvStatus.code(vals[0])

        return {
            'lv_status': lv_status,
            'has_raid_recon': has_raid_recon
        }

    @deco_deal_excep
    def save_lv_info(self, lv_name, lv_type):
        insert_data_sql = "insert into lv values ('{0}','{1}')".\
            format(lv_name, lv_type)
        cursor = conn.cursor()
        cursor.execute(insert_data_sql)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def update_lv_info(self, lv_name, lv_name_config):
        update_data_sql = "update lv set name='{0}' where name='{1}'".\
            format(lv_name_config, lv_name)
        cursor = conn.cursor()
        cursor.execute(update_data_sql)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def delete_lv_info(self, lv_name):
        delete_data_sql = "delete from lv where name='{0}'".format(lv_name)
        cursor = conn.cursor()
        cursor.execute(delete_data_sql)
        cursor.close()
        conn.commit()

    @staticmethod
    def get_lv_names():
        lv_names = []
        cmd = "lvs | grep volume_ | awk '{print $1}'"
        results = ShellCmd.execute_shell_cmd(cmd)

        if results:
            lv_names = results.strip().split('\n')

        return lv_names

    @deco_deal_excep
    def get_lvtype_by_name(self, lv_name):
        lv_names = ARLvManager.get_lv_names()
        if lv_name not in lv_names:
            raise ARLvException(LvStatusPool.ID_LV_NOT_FOUND)

        lv_type = None
        query_sql = "select lv_type from lv where name='{0}'".\
            format(lv_name)
        cursor = conn.cursor()
        result = cursor.execute(query_sql).fetchall()
        cursor.close()
        conn.commit()

        if result:
            lv_type = result[0][0]

        return {
            'lv_type': lv_type,
        }

    @deco_deal_excep
    def get_lv_in_raid_name(self, lv_name):
        """
            创建vg时，vg的名称与所在raid是保持一致的，所以通常的做法是通过获取vg的名称
            来表示当前lv所在的raid名称。这样做的坏处是当raid被手动删除了，而lv还是能够识别
            到vg的值，即这种方式无法察觉到raid被异常删除的情况。
            考虑到实际的应用场景中，当raid上面存在lv时，是不允许删除的raid的。
            这里，采用上述通过vg名称来表示raid名称的做法，提升raid重建时，访问lv接口的响应性能。
        """
        lv_in_raid_name = None
        lv_vg = self.get_lv_vg(lv_name)['lv_vg']
        raid_exists = ARRaidManager().estimate_raid_is_exists(lv_vg
                                                              )['raid_exists']

        if raid_exists:
            lv_in_raid_name = lv_vg

        return {
            'lv_in_raid_name': lv_in_raid_name
        }

    @deco_deal_excep
    def get_all_lv_info(self):
        lv_names = ARLvManager.get_lv_names()
        all_lv_infos = []

        for lv_name in lv_names:
            all_lv_infos.append(self.get_lv_info(lv_name.split('_')[1]))

        return sorted(all_lv_infos, key=lambda lv: lv['lv_name'])

    @deco_deal_excep
    def get_lv_capacity_avaicapacity_usedpercent(self, lv_name):
        lv_of_mount = self.lv_vg_capacity_usedcapacity_dir(lv_name)
        lv_capacity = lv_of_mount['lv_capacity']
        lv_available_capacity = lv_of_mount['lv_available_capacity']
        lv_used_percent = lv_of_mount['lv_used_percent']
        lv = self.get_lvsize_usedsize_by_cmd_lvs(lv_name)

        if not lv_capacity:
            lv_capacity = lv['lvsize']
        if not lv_available_capacity:
            lv_available_capacity = lv['lvsize']
        if not lv_used_percent:
            lv_used_percent = '0'

        return {
            'lv_capacity': Raidlv.size_patter(lv_capacity),
            'lv_available_capacity': Raidlv.size_patter(lv_available_capacity),
            'lv_used_percent': lv_used_percent
        }

    @deco_deal_excep
    def get_lv_info(self, lv_name):
        lv_name = 'volume_{0}'.format(lv_name.strip())
        raid_name = self.get_lv_vg(lv_name)['lv_vg']
        lv_type = self.get_lvtype_by_name(lv_name)['lv_type']
        lv_capacity = self.get_lvsize_usedsize_by_cmd_lvs(lv_name)['lvsize']
        lv_status_has_raid_recon = self.get_lv_status(lv_name)
        lv_vgsize_vgfree = self.get_vgsize_vgfree_about_lv(lv_name)
        lv_capacity_avacapacity_usedpercent = self.\
            get_lv_capacity_avaicapacity_usedpercent(lv_name)
        create_is_done = self.validate_create_is_done(lv_name
                                                      )['create_is_done']

        return {
            'lv_name': lv_name.split('_')[1],
            'lv_capacity': lv_capacity,
            'lv_avalible_capacity': lv_capacity_avacapacity_usedpercent[
                'lv_available_capacity'],
            'lv_used_percent': lv_capacity_avacapacity_usedpercent[
                'lv_used_percent'],
            'lv_type': lv_type,
            'raid_name': raid_name,
            'lv_status': ARLvStatus.code(ARLvStatus.CREATING) if not
            create_is_done else lv_status_has_raid_recon['lv_status'],
            'lv_vgsize': lv_vgsize_vgfree['lv_vgsize'],
            'lv_vgfree': lv_vgsize_vgfree['lv_vgfree'],
            'has_raid_recon': lv_status_has_raid_recon['has_raid_recon']
        }

    @deco_deal_excep
    def get_lvsize_usedsize_by_cmd_lvs(self, lv_name):
        lv_names = ARLvManager.get_lv_names()
        if lv_name not in lv_names:
            raise ARLvException(LvStatusPool.ID_LV_NOT_FOUND)

        cmd = "lvs | grep %s | awk '{print $4}'" % lv_name
        result = ShellCmd.execute_shell_cmd(cmd)
        lvsize = None

        if result:
            vals = result.strip().split('\n')
            if vals:
                lvsize = Raidlv.size_patter(vals[0])

        return {
            'lvsize': lvsize,
            'usedsize': None
        }

    @deco_deal_excep
    def get_lvsize_usedsize(self, lv_name):
        lv_vg_capacity_usedcapacity_dir = self.lv_vg_capacity_usedcapacity_dir(lv_name)
        mount_dir = lv_vg_capacity_usedcapacity_dir['mount_dir']

        """
            根据mount_dir是否为空，判断该lv是否挂载目录
        """
        if mount_dir is None:
            lvsize_usedsize = self.get_lvsize_usedsize_by_cmd_lvs(lv_name)
            lvsize = lvsize_usedsize['lvsize']
            usedsize = lvsize_usedsize['usedsize']
        else:
            lvsize = lv_vg_capacity_usedcapacity_dir['lv_capacity']
            usedsize = lv_vg_capacity_usedcapacity_dir['lv_used_capacity']

        return {
            'lvsize': lvsize,
            'usedsize': usedsize
        }
