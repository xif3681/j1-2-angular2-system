#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: pd_raid.py
    @time: 2016/12/10 13:48
"""
from modules.megacli import Megacli
from utils.error.ar_exception import ARPdException, ARRaidException
from utils.error.status_pool import PdStatusPool, RaidStatusPool
import re


class Pdraid(object):
    VALID_SLOT_NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

    @staticmethod
    def validate_slot_number(slot_number):
        if slot_number not in Pdraid.VALID_SLOT_NUMBERS:
            raise ARPdException(PdStatusPool.ID_SLOT_NUMBER_INVALID)

    @staticmethod
    def get_phys_enclosure_id():
        cmd = "-PDList -aALL | grep -m1 'Enclosure Device ID'"
        result = Megacli().execute(cmd)
        enclosure_id = None

        if result:
            enclosure_id = result[0].split(':')[1]

        return {
            'enclosure_id': enclosure_id
        }

    @staticmethod
    def get_raidname_of_physdrv(slot_number):
        from modules.ar_raid_manager import ARRaidManager
        vir_drv_id_slots = ARRaidManager.get_raid_to_physdrvs()
        raid_name = None

        if vir_drv_id_slots:
            for vir_drv_id_slot in vir_drv_id_slots:
                if slot_number in vir_drv_id_slot:
                    vir_id = vir_drv_id_slot[-1].split('vir')[1]
                    raid_name = ARRaidManager().get_raid_name_by_vd(vir_id)['raid_name']
                    break

        return {
            'raid_name': raid_name
        }

    @staticmethod
    def size_pattern(size_str):
        result = None
        if size_str.find('0 KB') != -1:
            return '0 TB'

        val = re.findall('[0-9]+\.[0-9]{2}', size_str)[0]
        if size_str.find('TB') != -1:
            result = '{0} TB'.format(val)
        elif size_str.find('GB') != -1:
            result = '{0} GB'.format(val)

        return result

    @staticmethod
    def physdrvs_by_slot_numbers(slot_numbers):
        from modules.ar_pd_manager import ARPdManager
        enclosure_id = ARPdManager.get_enclosure_id()['enclosure_id']
        physdrvs = []
        slot_numbers = list(re.findall('[0-9]+', str(slot_numbers)))

        for slot_number in slot_numbers:
            Pdraid.validate_slot_number(slot_number)
            physdrvs.append('{0}:{1}'.format(enclosure_id, slot_number))

        return str(physdrvs).replace("'", "")

    @staticmethod
    def clear_physdrv_foreign_state(slot_numbers):
        slot_numbers = list(re.findall('[0-9]+', slot_numbers))

        for slot_number in slot_numbers:
            cmd = '-CfgForeign -Clear {0} -aALL'.format(slot_number)
            Megacli().execute(cmd)

    @staticmethod
    def exists_raid_recon():
        cmd = '-LDInfo -Lall -a0 | grep Reconstruction'
        result = Megacli().execute(cmd)

        if result:
            raise ARRaidException(RaidStatusPool.ID_EXISTS_RAID_RECON)

    @staticmethod
    def has_raid_recon():
        has_raid_recon = 0
        cmd = '-LDInfo -Lall -a0 | grep Reconstruction'
        result = Megacli().execute(cmd)

        if result:
            has_raid_recon = 1

        return {
            'has_raid_recon': has_raid_recon
        }
