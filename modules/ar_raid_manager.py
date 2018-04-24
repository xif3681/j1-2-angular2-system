#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: ar_raid_manager.py
    @time: 2016/12/1 10:46
"""
from modules.megacli import Megacli, MegacliError
from arpylibs.base_error import ARBaseError
from pd_raid import Pdraid
from modules.sqlite_db import conn
from modules.shell_cmd import ShellCmd
from raid_lv import Raidlv
from utils.error.ar_exception import ARRaidException
from utils.error.status_pool import RaidStatusPool
import re


def deco_deal_excep(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ARBaseError as e:
            raise e
        except MegacliError:
            raise ARRaidException(RaidStatusPool.ID_MEGACLI_NOT_FOUND)
        except Exception:
            raise ARRaidException(RaidStatusPool.ID_SERVER_ERROR)

    return wrapper


class ARRaidStatus(object):
    OPTIMAL = 'Optimal'
    RECONSTRUCTING = 'Reconstructing'
    OFFLINE = 'Offline'
    DEGRADED = 'Degraded'

    @staticmethod
    def code(status):
        if status == ARRaidStatus.OPTIMAL:
            return 0
        elif status == ARRaidStatus.RECONSTRUCTING:
            return 1
        elif status == ARRaidStatus.DEGRADED:
            return 2
        elif status == ARRaidStatus.OFFLINE:
            return 3
        else:
            return 3


class ARRaidManager(object):
    @deco_deal_excep
    def __init__(self):
        self._megacli = Megacli()
        cursor = conn.cursor()
        create_table = 'create table if not exists raid' \
                       '(vd varchar(5), tag varchar(10))'
        create_table2 = 'create table if not exists raid_config ' \
                        '(vd varchar(5), raid_name varchar(30), ' \
                        'raid_level varchar(10), raid_capacity varchar(10), ' \
                        'physdrvs varchar(20), stripsz varchar(10))'
        create_table3 = 'create table if not exists raid_id_name ' \
                        '(vd varchar(5), raid_name varchar(30))'
        cursor.execute(create_table)
        cursor.execute(create_table2)
        cursor.execute(create_table3)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def create_raid(self, raid_name, raid_level, slot_numbers, stripsz):
        if raid_name in self.get_raid_names():
            raise ARRaidException(RaidStatusPool.ID_RAID_NAME_HAS_BEEN_USED)

        physdrvs = Pdraid.physdrvs_by_slot_numbers(slot_numbers)
        cmd = "-CfgLdAdd -r%s%s strpsz%s -a0" % (raid_level, physdrvs, stripsz)
        pre = ShellCmd.execute_shell_cmd('lsscsi')
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        self.raid_raise_excep(exit_code)
        vir_drv_id = None
        create = 0

        if exit_code == '0x00':
            raid_tag = ARRaidManager.get_raid_tag(pre)['raid_tag']
            for value in values:
                if value.find('Created VD') != -1:
                    vir_drv_id = value.split(':')[1].split(' ')[2]
                    self.save_raid_info(vir_drv_id, raid_tag)
                    set_raid_name = self.set_raid_name(vir_drv_id, raid_name
                                                       )['set_raid_name']
                    if set_raid_name == 1:
                        ARRaidManager.save_raid_id_name(vir_drv_id, raid_name)
                        create = 1
                    break

        return {
            'vir_drv_id': vir_drv_id,
            'create': create
        }

    @deco_deal_excep
    def set_raid_name(self, vir_drv_id, raid_name):
        cmd = "-LDSetProp -Name {0} -L{1} -aALL".format(raid_name, vir_drv_id)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        self.raid_raise_excep(exit_code)
        set_raid_name = 0

        if exit_code == '0x00':
            set_raid_name = 1

        return {
            'set_raid_name': set_raid_name
        }

    @staticmethod
    def get_raid_drive_letter(raid_tag):
        drive_letter = None

        if raid_tag is not None:
            cmd = 'lsscsi'
            results = ShellCmd.execute_shell_cmd(cmd).strip().split('\n')

            for result in results:
                if result.find(raid_tag) != -1:
                    value = re.findall('/[a-z]+/[a-z]+', result)
                    if value:
                        drive_letter = value[0]
                    break

        return {
            'drive_letter': drive_letter
        }

    @staticmethod
    def get_raid_tag(pre):
        raid_tag = None
        now = None

        if pre:
            while 1:
                now = ShellCmd.execute_shell_cmd('lsscsi')
                if now and now != pre:
                    break

            pre = pre.strip().split('\n')
            now = now.strip().split('\n')
            pre = [item.strip() for item in pre]
            now = [item.strip() for item in now]
            raid_tag = list(set(now) ^ set(pre))[0].split(' ')[0]

        return {
            'raid_tag': raid_tag
        }

    @deco_deal_excep
    def delete_raid(self, vir_drv_id):
        """
            当raid上面存在逻辑卷时，则无法删除；
        """
        if vir_drv_id not in ARRaidManager.get_raid_id():
            raise ARRaidException(RaidStatusPool.ID_RAID_NOT_FOUND)

        raid_name = self.get_raid_name_by_vd(vir_drv_id)['raid_name']
        vg = self.get_raid_vg_and_vgsize(raid_name)['vg']
        lvs = self.get_raid_lvs_by_vg(vg)['lvs']

        raid_state = self.get_raid_state_size_stripsz(
            vir_drv_id)['raid_state']

        if raid_state and raid_state != ARRaidStatus.OFFLINE and lvs:
            raise ARRaidException(RaidStatusPool.ID_RAID_HAS_LV)

        self.delete_pv_vg_by_vg(vir_drv_id)
        cmd = "-CfgLdDel -L{0} -aALL".format(vir_drv_id)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        self.raid_raise_excep(exit_code)
        delete = 0

        if exit_code == '0x00':
            for val in values:
                if val.find('Deleted') != -1:
                    delete = 1
            ARRaidManager.delete_raid_id_name(vir_drv_id)
            self.delete_raid_info(vir_drv_id)

        return {
            'vir_drv_id': vir_drv_id,
            'delete': delete
        }

    @deco_deal_excep
    def save_raid_cache(self, vir_drv_id):
        name_level_capacity_stripsz = self.get_raid_name_level_capacity_stripsz(
            vir_drv_id)
        physdrvs = self.get_one_raid_level_and_physdrvs(vir_drv_id)['physdrvs']
        insert_data = "insert into raid_config values ('{0}','{1}','{2}','{3}'," \
                      "\"{4}\",'{5}')".\
            format(vir_drv_id,
                   name_level_capacity_stripsz['raid_name'],
                   name_level_capacity_stripsz['raid_level'],
                   name_level_capacity_stripsz['raid_capacity'],
                   physdrvs,
                   name_level_capacity_stripsz['stripsz'])

        cursor = conn.cursor()
        cursor.execute(insert_data)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def get_raid_cache(self, vir_drv_id):
        query_data = "select raid_name, raid_level, raid_capacity, physdrvs, " \
                     "stripsz from raid_config where vd='{0}'".format(vir_drv_id)
        cursor = conn.cursor()
        result = cursor.execute(query_data).fetchall()
        cursor.close()
        conn.commit()
        raid_name = None
        raid_level = None
        raid_capacity = None
        physdrvs = None
        stripsz = None

        if result:
            raid_name = result[0][0]
            raid_level = result[0][1]
            raid_capacity = result[0][2]
            physdrvs = re.findall('[0-9]+', result[0][3])
            stripsz = result[0][4]

        return {
            'raid_name': raid_name,
            'raid_level': raid_level,
            'raid_capacity': raid_capacity,
            'physdrvs': physdrvs,
            'stripsz': stripsz
        }

    @deco_deal_excep
    def delete_raid_cache(self, vir_drv_id):
        delete_data = "delete from raid_config where vd = '{0}'".\
            format(vir_drv_id)
        cursor = conn.cursor()
        cursor.execute(delete_data)
        cursor.close()
        conn.commit()

    @staticmethod
    @deco_deal_excep
    def save_raid_id_name(vir_drv_id, raid_name):
        insert_data = "insert into raid_id_name values ('{0}', '{1}')".\
            format(vir_drv_id, raid_name)
        cursor = conn.cursor()
        cursor.execute(insert_data)
        cursor.close()
        conn.commit()

    @staticmethod
    @deco_deal_excep
    def get_raid_id():
        """
            成功创建raid，同时将raid的ID写入缓存中。
            同样，通过缓存来获取raid的ID。这样，系统raid
            的ID号不会被写入缓存中，即间接过滤掉了系统raid。
        """
        query_data = 'select vd from raid_id_name'
        cursor = conn.cursor()
        result = cursor.execute(query_data).fetchall()
        cursor.close()
        conn.commit()
        raid_ids = []

        if result:
            for val in result:
                raid_ids.append(val[0])

        return raid_ids

    @staticmethod
    @deco_deal_excep
    def delete_raid_id_name(vir_drv_id):
        delete_data = "delete from raid_id_name where vd = '{0}'".\
            format(vir_drv_id)
        cursor = conn.cursor()
        cursor.execute(delete_data)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def get_raid_recon_info(self, vir_drv_id):
        cmd = '-LDInfo -L{0} -a0 | grep Reconstruction'.\
            format(vir_drv_id)
        result = self._megacli.execute(cmd)
        is_recon = 0
        recon_percent = None

        if result:
            is_recon = 1
            recon_percent = re.findall('[0-9]+', result[0])[0]

        return {
            'is_recon': is_recon,
            'recon_percent': recon_percent
        }

    @deco_deal_excep
    def config_raid(self, vir_drv_id, slot_numbers):
        physdrvs = Pdraid.physdrvs_by_slot_numbers(slot_numbers)
        raid_level = self.get_one_raid_level_and_physdrvs(vir_drv_id)['level']
        cmd = "-LDRecon -Start -r%s -Add -PhysDrv%s -L%s -a0" % \
              (raid_level, physdrvs, vir_drv_id)

        '''更新缓存中的数据'''
        self.delete_raid_cache(vir_drv_id)
        self.save_raid_cache(vir_drv_id)

        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        self.raid_raise_excep(exit_code)
        config = 0

        if exit_code == '0x00':
            config = 1

        return {
            'vir_drv_id': vir_drv_id,
            'config': config
        }

    @deco_deal_excep
    def reconstruct_raid(self, vir_drv_id, slot_numbers):
        raid_state = self.get_raid_state_size_stripsz(vir_drv_id)['raid_state']

        if raid_state != ARRaidStatus.DEGRADED:
            raise ARRaidException(RaidStatusPool.ID_RAID_CAN_NOT_RECONSTRUCT)

        physdrvs = Pdraid.physdrvs_by_slot_numbers(slot_numbers)
        raid_level = self.get_one_raid_level_and_physdrvs(vir_drv_id)['level']
        cmd = "-LDRecon -Start -r%s -Add -PhysDrv%s -L%s -a0" % \
              (raid_level, physdrvs, vir_drv_id)

        '''更新缓存中的数据'''
        self.delete_raid_cache(vir_drv_id)
        self.save_raid_cache(vir_drv_id)

        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        self.raid_raise_excep(exit_code)
        reconstruct = 0

        if exit_code == '0x00':
            reconstruct = 1

        return {
            'vir_drv_id': vir_drv_id,
            'reconstruct': reconstruct
        }

    @deco_deal_excep
    def save_raid_info(self, vir_drv_id, tag):
        insert_data_sql = "insert into raid values ('{0}','{1}')".\
            format(vir_drv_id, tag)
        cursor = conn.cursor()
        cursor.execute(insert_data_sql)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def delete_raid_info(self, vir_drv_id):
        delete_data_sql = "delete from raid where vd='{0}'".format(vir_drv_id)
        cursor = conn.cursor()
        cursor.execute(delete_data_sql)
        cursor.close()
        conn.commit()

    @deco_deal_excep
    def get_all_raid_info(self):
        """
            raid ID使用缓存策略；
            创建一个raid时，将raid ID写入缓存，
            删除一个raid，同时删除缓存中的raid ID。
        """
        raid_ids = ARRaidManager.get_raid_id()

        if not raid_ids:
            return []

        all_raid_infos = []

        for raid_id in raid_ids:
            all_raid_infos.append(self.get_raid_info(raid_id))

        return sorted(all_raid_infos, key=lambda raid: int(
            raid['vir_drv_id']))

    @deco_deal_excep
    def get_raid_can_beused(self):
        """
            正常与降级的raid方可用来创建逻辑卷
        """
        all_raids = self.get_all_raid_info()
        can_beused_raids = []

        if all_raids:
            for raid in all_raids:
                if raid['raid_state'] in [ARRaidStatus.code(ARRaidStatus.OPTIMAL),
                                          ARRaidStatus.code(ARRaidStatus.DEGRADED)]:
                    can_beused_raids.append(raid)

        return can_beused_raids

    @deco_deal_excep
    def get_raid_info(self, vir_drv_id):
        """
            此处缓存策略的设计，仅适应于一个RAID的情况。
        """
        is_recon_and_percent = self.get_raid_recon_info(vir_drv_id)
        is_recon = is_recon_and_percent['is_recon']

        if is_recon:
            '''raid重建使用缓存'''
            raid_state = ARRaidStatus.code(ARRaidStatus.RECONSTRUCTING)
            recon_completed = is_recon_and_percent['recon_percent']
            name_level_capacity_physdrvs_stripsz = self.get_raid_cache(vir_drv_id)
            raid_name = name_level_capacity_physdrvs_stripsz['raid_name']
            raid_level = name_level_capacity_physdrvs_stripsz['raid_level']
            raid_size = name_level_capacity_physdrvs_stripsz['raid_capacity']
            physdrvs = name_level_capacity_physdrvs_stripsz['physdrvs']
            strpsz = name_level_capacity_physdrvs_stripsz['stripsz']
        else:
            raid_name = self.get_raid_name_by_vd(vir_drv_id)['raid_name']
            level_physdrvs = self.get_one_raid_level_and_physdrvs(vir_drv_id)
            raid_level = level_physdrvs['level']
            physdrvs = level_physdrvs['physdrvs']
            state_size_stripsz = self.get_raid_state_size_stripsz(vir_drv_id)
            raid_state = ARRaidStatus.code(state_size_stripsz['raid_state'])
            raid_size = state_size_stripsz['raid_size']
            recon_completed = state_size_stripsz['recon_completed']
            strpsz = state_size_stripsz['raid_strpsz']

        vg_vgsize = self.get_raid_vg_and_vgsize(raid_name)

        return {
            'vir_drv_id': vir_drv_id,
            'raid_name': raid_name,
            'raid_level': raid_level,
            'physdrvs': physdrvs,
            'raid_state': raid_state,
            'raid_size': raid_size if not vg_vgsize['vgsize'] else vg_vgsize['vgsize'],
            'recon_completed': recon_completed,
            'strpsz': strpsz,
            'vgsize': vg_vgsize['vgsize'],
            'vgfree': vg_vgsize['vgfree']
        }

    @deco_deal_excep
    def get_raid_name_level_capacity_stripsz(self, vir_drv_id):
        cmd = "-LDInfo -L{0} -a0 | grep -E 'Name|RAID Level|Size'".\
            format(vir_drv_id)
        result = self._megacli.execute(cmd)
        raid_name = None
        raid_level = None
        raid_capacity = None
        stripsz = None

        if result:
            raid_name = result[0].split(':')[1]
            raid_level = ARRaidManager.raid_level(result[1].split(':')[1])
            raid_capacity = Pdraid.size_pattern(result[2].split(':')[1])
            stripsz = result[-1].split(':')[1]

        return {
            'raid_name': raid_name,
            'raid_level': raid_level,
            'raid_capacity': raid_capacity,
            'stripsz': stripsz
        }

    @deco_deal_excep
    def get_raid_names(self):
        cmd = '-LDInfo -Lall -aALL | grep Name'
        values = self._megacli.execute(cmd)
        raid_names = []

        if values:
            for value in values:
                val = re.findall('Name:([a-zA-Z0-9]+)', value)
                if val:
                    raid_names.append(val[0])

        return raid_names

    @deco_deal_excep
    def get_raid_tag_by_vd(self, vir_drv_id):
        if vir_drv_id not in ARRaidManager.get_raid_id():
            raise ARRaidException(RaidStatusPool.ID_RAID_NOT_FOUND)

        raid_tag = None
        query_sql = "select tag from raid where vd='{0}'".format(vir_drv_id)
        cursor = conn.cursor()
        result = cursor.execute(query_sql).fetchall()
        cursor.close()
        conn.commit()

        if result:
            raid_tag = result[0][0]

        return {
            'raid_tag': raid_tag
        }

    @deco_deal_excep
    def get_raid_name_by_vd(self, vir_drv_id):
        cmd = '-LDInfo -L{0} -aALL | grep Name'.format(vir_drv_id)
        values = self._megacli.execute(cmd)
        raid_name = None

        if values:
            val = re.findall('Name:([a-zA-Z0-9]+)', values[0])
            if val:
                raid_name = val[0]

        return {
            'raid_name': raid_name
        }

    @deco_deal_excep
    def get_raid_id_by_name(self, raid_name):
        """
            通过缓存获取数据
        """
        query_data = "select vd, raid_name from raid_id_name"
        cursor = conn.cursor()
        vals = cursor.execute(query_data).fetchall()
        cursor.close()
        conn.commit()
        vir_drv_id = None

        if vals:
            for val in vals:
                if raid_name in val:
                    vir_drv_id = val[0]
                break

        return {
            'vir_drv_id': vir_drv_id
        }

    @deco_deal_excep
    def get_raid_vg_and_vgsize(self, raid_name):
        cmd = 'vgs | grep {0}'.format(raid_name)
        result = ShellCmd.execute_shell_cmd(cmd)
        vg = None
        vgsize = None
        vgfree = None

        if result:
            values = [item.strip() for item in result.split('\n')]
            raid_info = [item for item in values[0].split(' ') if item]
            vg = raid_info[0]
            vgsize = Raidlv.size_patter(raid_info[5])
            vgfree = Raidlv.size_patter(raid_info[6])

        return {
            'vg': vg,
            'vgsize': vgsize,
            'vgfree': vgfree
        }

    @deco_deal_excep
    def get_raid_size(self, vir_drv_id):
        cmd = "-LDInfo -Lall -aALL | grep -E 'Virtual Drive:|Size'"
        values = self._megacli.execute(cmd)
        raid_size = None

        if values:
            for value in values:
                if value.find('Virtual Drive:{0}'.format(vir_drv_id)
                              ) != -1:
                    raid_size_index = values.index(value) + 1
                    raid_size = Pdraid.size_pattern(values[raid_size_index])
                    break

        return raid_size

    @deco_deal_excep
    def get_raid_lvs_by_vg(self, vg):
        cmd = "lvs |grep %s |awk '{print $1}'" % vg
        results = ShellCmd.execute_shell_cmd(cmd)
        lvs = []

        if results:
            values = results.split('\n')
            lvs = [lv for lv in values if lv]

        return {
            'lvs': lvs
        }

    @deco_deal_excep
    def estimate_raid_is_exists(self, raid_name):
        raid_exists = 0
        cmd = "-LDInfo -Lall -aALL | grep 'Name'"
        values = self._megacli.execute(cmd)

        if values:
            if 'Name:{0}'.format(raid_name) in values:
                raid_exists = 1

        return {
            'raid_exists': raid_exists
        }

    @deco_deal_excep
    def delete_pv_vg_by_vg(self, vir_drv_id):
        raid_name = self.get_raid_name_by_vd(vir_drv_id)['raid_name']
        raid_tag = self.get_raid_tag_by_vd(vir_drv_id)['raid_tag']
        raid_drive_letter = self.get_raid_drive_letter(raid_tag)
        vg = self.get_raid_vg_and_vgsize(raid_name)['vg']

        if vg:
            cmd = "vgremove -f %s && pvremove -f %s{1,2,3,4,5}" % \
                  (vg, raid_drive_letter)
            ShellCmd.execute_shell_cmd(cmd)

    @deco_deal_excep
    def get_raid_state_size_stripsz(self, vir_drv_id):
        cmd = '-LDInfo -L{0} -aALL'.format(vir_drv_id)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        self.raid_raise_excep(exit_code)
        raid_state = None
        raid_size = None
        raid_strpsz = None
        recon_completed = None

        if exit_code == '0x00':
            results = []

            for val in values:
                if val.find('Size') == 0 or val.find('State') == 0 \
                        or val.find('Strip Size') == 0 or val.find('Reconstruction') == 0:
                    results.append(val)

            state_size_strpsz = {}
            map(lambda x: state_size_strpsz.setdefault(x.split(':')[0], x.split(':')[1]), results)

            if 'Reconstruction' in state_size_strpsz.keys():
                raid_state = 'Reconstructing'
                recon_completed = re.findall('[0-9]+%', state_size_strpsz['Reconstruction']
                                             )[0].split('%')[0]

            raid_state = raid_state if raid_state else state_size_strpsz['State']
            raid_size = Pdraid.size_pattern(state_size_strpsz['Size'])
            raid_strpsz = state_size_strpsz['Strip Size']

        return {
            'raid_state': raid_state,
            'raid_size': raid_size,
            'raid_strpsz': raid_strpsz,
            'recon_completed': recon_completed
        }

    @deco_deal_excep
    def get_one_raid_level_and_physdrvs(self, vir_drv_id):
        raids = self.get_raids_level_and_physdrvs()

        for raid in raids:
            if vir_drv_id == raid['vir']:
                return raid

        return {
            'vir': vir_drv_id,
            'level': None,
            'physdrvs': None
        }

    @deco_deal_excep
    def get_raids_level_and_physdrvs(self):
        cmd = "-CfgDsply -a0 | grep -E 'Virtual Drive:|RAID Level|Slot Number'"
        values = self._megacli.execute(cmd)
        raids_level_physdrvs = []

        if values:
            keys = [k for k, v in enumerate(values) if v.find('Virtual Drive') != -1]
            keys.append(len(values))
            elements = []

            for i in range(len(keys) - 1):
                elements.append(keys[i:i + 2])

            for n in elements:
                vir_slots = values[n[0]:n[1]]
                vir = None
                level = None
                physdrvs = []

                for val in vir_slots:
                    if val.find('Virtual Drive') != -1:
                        vir = re.findall('[0-9]+', val)[0]
                    elif val.find('RAID Level') != -1:
                        level = re.findall('[0-9]+', val)[0]
                    else:
                        physdrvs.append(re.findall('[0-9]+', val)[0])

                raids_level_physdrvs.append({
                    'vir': vir,
                    'level': level,
                    'physdrvs': physdrvs
                })

        return raids_level_physdrvs

    @staticmethod
    def raid_level(level):
        levels = {
            'Primary-0, Secondary-0, RAID Level Qualifier-0': '0',
            'Primary-5, Secondary-0, RAID Level Qualifier-3': '5'
        }

        if level in levels:
            return levels[level]

    @staticmethod
    @deco_deal_excep
    def get_raid_to_physdrvs():
        cmd = "-CfgDsply -aALL | grep -E 'Virtual Drive:|Slot Number'"
        values = Megacli().execute(cmd)
        vir_drv_id_slots = []

        if values:
            keys = [k for k, v in enumerate(values) if v.find('Virtual Drive') != -1]
            keys.append(len(values))
            keys_len = len(keys)
            keys_in_two = []

            for i in range(keys_len - 1):
                keys_in_two.append(keys[i:i + 2])

            for n in keys_in_two:
                vir_slots = values[n[0]:n[1]]
                vir = None
                slots = []

                for val in vir_slots:
                    if val.find('Virtual Drive') != -1:
                        vir = re.findall('[0-9]+', val)[0]
                    else:
                        slots.append(re.findall('[0-9]+', val)[0])

                slots.append('vir{0}'.format(vir))
                vir_drv_id_slots.append(slots)

        return vir_drv_id_slots

    @deco_deal_excep
    def raid_raise_excep(self, exit_code):
        if exit_code == '0x01':
            raise ARRaidException(RaidStatusPool.ID_INVALID_COMMAND)
        elif exit_code == '0x03':
            raise ARRaidException(RaidStatusPool.
                                  ID_RAID_LEVEL_OR_DISK_NUMBER_OR_STRIPSZ_ERROR)
        elif exit_code == '0x1a':
            raise ARRaidException(RaidStatusPool.ID_MAXIMUM_LDS_ALREADY_CONFIGURED)
        elif exit_code == '0x1d':
            raise ARRaidException(RaidStatusPool.ID_RECONSTRUCTION_IN_PROGRESS)
