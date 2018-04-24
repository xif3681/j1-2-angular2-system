#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: raid_reconstruct_handler.py
    @time: 2016/12/12 13:27
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_raid_manager import ARRaidManager


class RaidReconstructHandler(BaseHandler):

    @deco_deal_error
    def post(self):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            vir_drv_id = self.get_argument_value('vir_drv_id')
            slot_numbers = self.get_argument_value('slot_numbers')
            result = ARRaidManager().reconstruct_raid(vir_drv_id, slot_numbers)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
