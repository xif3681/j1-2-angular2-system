#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明:Copyright(c) 2014 AnyRobot, EISOO
    文件作者:Tony.fang@eisoo.com
    @file: ar_pd_manager.py
    @time: 2016/11/30 18:19
"""
from modules.megacli import Megacli, MegacliError
from arpylibs.base_error import ARBaseError
from modules.pd_raid import Pdraid
from modules.sqlite_db import conn
from utils.error.ar_exception import ARPdException
from utils.error.status_pool import PdStatusPool
import re


def deco_deal_excep(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ARBaseError as e:
            raise e
        except MegacliError:
            raise ARPdException(PdStatusPool.ID_MEGACLI_NOT_FOUND)
        except Exception:
            raise ARPdException(PdStatusPool.ID_SERVER_ERROR)

    return wrapper


class ARPdStatus(object):
    GOOD = 'Unconfigured(good)'
    BAD = 'Unconfigured(bad)'
    HOTSPARE = 'Hotspare'
    ONLINE = 'Online'
    OFFLINE = 'Offline'
    REBUILD = 'Rebuild'
    FAILED = 'Failed'
    INIT = 'Initializing'

    @staticmethod
    def code(status):
        if status == ARPdStatus.GOOD:
            return 0
        elif status == ARPdStatus.BAD:
            return 1
        elif status == ARPdStatus.HOTSPARE:
            return 2
        elif status == ARPdStatus.ONLINE:
            return 3
        elif status == ARPdStatus.OFFLINE:
            return 4
        elif status == ARPdStatus.REBUILD:
            return 5
        elif status == ARPdStatus.FAILED:
            return 6
        elif status == ARPdStatus.INIT:
            return 7
        else:
            return 6


class ARPdManager(object):
    @deco_deal_excep
    def __init__(self):
        self._megacli = Megacli()
        cursor = conn.cursor()
        create_table = 'create table if not exists pd (' \
                       'enclosure_id varchar(5))'
        cursor.execute(create_table)
        cursor.close()
        conn.commit()
        enclosure_id = ARPdManager.get_enclosure_id()[
            'enclosure_id']

        if not enclosure_id:
            enclosure_id = Pdraid.get_phys_enclosure_id()[
                'enclosure_id']
            ARPdManager.save_enclosure_id(enclosure_id)

    @staticmethod
    def save_enclosure_id(enclosure_id):
        insert_sql = "insert into pd values ('{0}')".\
            format(enclosure_id)
        cursor = conn.cursor()
        cursor.execute(insert_sql)
        cursor.close()
        conn.commit()

    @staticmethod
    def get_enclosure_id():
        enclosure_id = None
        query_sql = 'select enclosure_id from pd'
        cursor = conn.cursor()
        result = cursor.execute(query_sql).fetchall()
        cursor.close()
        conn.commit()

        if result:
            enclosure_id = result[0][0]

        return {
            'enclosure_id': enclosure_id
        }

    @deco_deal_excep
    def get_valid_physdrvs(self):
        cmd = "-PDList -aALL | grep 'Slot Number'"
        values = self._megacli.execute(cmd)
        slot_numbers = []

        if values:
            for value in values:
                slot_number = value.split(':')[1]
                if int(slot_number) < 12:
                    slot_numbers.append(value.split(':')[1])

        return slot_numbers

    @deco_deal_excep
    def get_physdrv_info(self, slot_number):
        Pdraid.validate_slot_number(slot_number)
        wwn_type_size_temperature = self.get_physdrv_wwn_type_size_temperature(
            slot_number)
        phy_status = self.get_phy_status(slot_number)['phy_status']
        init_completed = self.get_physdrv_init_info(slot_number)['init_completed']
        rbld_completed = self.get_physdrv_rebuild_info(slot_number)['rbld_completed']
        raid_name = Pdraid.get_raidname_of_physdrv(slot_number)['raid_name']

        return {
            'slot_number': slot_number,
            'wwn': wwn_type_size_temperature['physdrv_wwn'],
            'type': wwn_type_size_temperature['physdrv_type'],
            'raid': raid_name,
            'capacity': wwn_type_size_temperature['physdrv_size'],
            'temperature': wwn_type_size_temperature['physdrv_temperature'],
            'state': ARPdStatus.code(phy_status),
            'init': init_completed,
            'rebuild': rbld_completed
        }

    @deco_deal_excep
    def get_can_beused_physdrvs(self):
        Pdraid.exists_raid_recon()
        cmd = "-PDList -a0 | grep -E 'Slot Number|PD Type|Raw Size|Unconfigured\(good\)'"
        values = Megacli().execute(cmd)
        can_beused_physdrvs = []

        if values:
            keys = [k for k, v in enumerate(values) if v.find('Unconfigured(good)') != -1]
            if keys:
                for key in keys:
                    slot_number = values[key-3].split(':')[1]
                    phy_status = self.get_phy_status(slot_number)['phy_status']
                    if phy_status == ARPdStatus.GOOD:
                        can_beused_physdrvs.append({
                            'slot_number': slot_number,
                            'type': values[key-2].split(':')[1],
                            'capacity': Pdraid.size_pattern(values[key-1]),
                        })

        return can_beused_physdrvs

    @deco_deal_excep
    def get_physdrv_wwn_type_size_temperature(self, slot_number):
        physdrv = Pdraid.physdrvs_by_slot_numbers(slot_number)
        cmd = "-PDInfo -PhysDrv{0} -aALL | grep -E 'WWN|PD Type|Raw Size|Drive Temperature'".\
            format(physdrv)
        results = self._megacli.execute(cmd)
        physdrv_wwn = None
        physdrv_type = None
        physdrv_size = None
        physdrv_temperature = None

        if results:
            for result in results:
                if result.find('WWN') != -1:
                    physdrv_wwn = result.split(':')[1]
                elif result.find('PD Type') != -1:
                    physdrv_type = result.split(':')[1]
                elif result.find('Raw Size') != -1:
                    physdrv_size = Pdraid.size_pattern(result)
                elif result.find('Drive Temperature') != -1:
                    val = re.findall('[0-9]+', result)
                    physdrv_temperature = val[0] if val else None

        return {
            'physdrv_wwn': physdrv_wwn,
            'physdrv_type': physdrv_type,
            'physdrv_size': physdrv_size,
            'physdrv_temperature': physdrv_temperature
        }

    @deco_deal_excep
    def all_physdrv_infos(self):
        Pdraid.exists_raid_recon()
        slot_numbers = self.get_valid_physdrvs()
        all_physdrv_infos = []

        for slot_number in slot_numbers:
            all_physdrv_infos.append(self.get_physdrv_info(slot_number))

        return sorted(all_physdrv_infos,
                      key=lambda physdrv: int(physdrv['slot_number']))

    @deco_deal_excep
    def get_phy_status(self, slot_number):
        phy_status = None
        physdrv_init = self.get_physdrv_init_info(slot_number)['physdrv_init']

        if physdrv_init:
            phy_status = physdrv_init
        else:
            cmd = "-PDList -a0 | grep -E 'Slot Number|Firmware state'"
            values = self._megacli.execute(cmd)

            if values:
                for val in values:
                    if val == 'Slot Number:{0}'.format(slot_number):
                        index = values.index(val)
                        phy_status = values[index+1].split(':')[1].split(',')[0]
                        break

        return {
            'phy_status': phy_status
        }

    @deco_deal_excep
    def get_phy_color(self, slot_number):
        phy_status = self.get_phy_status(slot_number)['phy_status']
        phy_color = 'gray'

        if phy_status in [ARPdStatus.GOOD, ARPdStatus.HOTSPARE, ARPdStatus.ONLINE,
                          ARPdStatus.OFFLINE, ARPdStatus.REBUILD, ARPdStatus.INIT]:
            phy_color = 'green'
        elif phy_status in [ARPdStatus.FAILED, ARPdStatus.BAD]:
            phy_color = 'red'

        return {
            'phy_color': phy_color
        }

    @deco_deal_excep
    def server_panel(self):
        Pdraid.exists_raid_recon()
        physdrvs = []
        for i in range(0, 12):
            physdrvs.append({
                'slot_number': i,
                'state': self.get_phy_color(i)['phy_color']
            })

        return physdrvs

    @deco_deal_excep
    def set_hotspare(self, slot_number):
        Pdraid.validate_slot_number(slot_number)
        physdrv = Pdraid.physdrvs_by_slot_numbers(slot_number)
        cmd = '-PDHSP -Set -PhysDrv{0} -aALL'.format(physdrv)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        set_hotspare = 0

        if exit_code == '0x00':
            set_hotspare = 1

        return {
            'physdrv': physdrv,
            'set_hotspare': set_hotspare
        }

    @deco_deal_excep
    def unset_hotspare(self, slot_number):
        Pdraid.validate_slot_number(slot_number)
        physdrv = Pdraid.physdrvs_by_slot_numbers(slot_number)
        cmd = '-PDHSP -Rmv -PhysDrv{0} -aALL'.format(physdrv)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        unset_hotspare = 0

        if exit_code == '0x00':
            unset_hotspare = 1

        return {
            'physdrv': physdrv,
            'unset_hotspare': unset_hotspare
        }

    @deco_deal_excep
    def get_physdrv_init_info(self, slot_number):
        enclosure_id = ARPdManager.get_enclosure_id()['enclosure_id']
        physdrv = Pdraid.physdrvs_by_slot_numbers(slot_number)
        cmd = '-PDClear -ShowProg -PhysDrv{0} -aALL'.format(physdrv)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        physdrv_init = None
        init_completed = None

        if exit_code == '0x00':
            info = 'Enclosure {0}, Slot {1}'.format(enclosure_id, slot_number)
            for val in values:
                if val.find(info) != -1:
                    physdrv_init = ARPdStatus.INIT
                    init_completed = re.findall('[0-9]+%', val)[0].split('%')[0]
                    break

        return {
            'physdrv_init': physdrv_init,
            'init_completed': init_completed
        }

    @deco_deal_excep
    def get_physdrv_rebuild_info(self, slot_number):
        enclosure_id = ARPdManager.get_enclosure_id()['enclosure_id']
        physdrv = Pdraid.physdrvs_by_slot_numbers(slot_number)
        physdrv_status = self.get_phy_status(slot_number)['phy_status']
        rbld_completed = None

        if physdrv_status == ARPdStatus.REBUILD:
            cmd = '-PDRbld -ShowProg -PhysDrv{0} -aALL'.format(physdrv)
            values = self._megacli.execute(cmd)
            exit_code = values[-1].split(':')[1]

            if exit_code == '0x00':
                info = 'Enclosure {0}, Slot {1}'.format(enclosure_id, slot_number)
                for val in values:
                    if val.find(info) != -1:
                        rbld_completed = re.findall('[0-9]+%', val)[0].split('%')[0]
                        break

        return {
            'rbld_completed': rbld_completed
        }

    @deco_deal_excep
    def init_physdrv(self, slot_number):
        Pdraid.validate_slot_number(slot_number)
        physdrv = Pdraid.physdrvs_by_slot_numbers(slot_number)
        cmd = '-PDClear -Start -PhysDrv{0} -aALL'.format(physdrv)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        init_physdrv = 0

        if exit_code == '0x00':
            init_physdrv = 1

        return {
            'physdrv': physdrv,
            'init_physdrv': init_physdrv
        }

    @deco_deal_excep
    def init_stop_physdrv(self, slot_number):
        Pdraid.validate_slot_number(slot_number)
        physdrv = Pdraid.physdrvs_by_slot_numbers(slot_number)
        cmd = '-PDClear -Stop -PhysDrv{0} -aALL'.format(physdrv)
        values = self._megacli.execute(cmd)
        exit_code = values[-1].split(':')[1]
        init_stop_physdrv = 0

        if exit_code == '0x00':
            init_stop_physdrv = 1

        return {
            'physdrv': physdrv,
            'init_stop_physdrv': init_stop_physdrv
        }
