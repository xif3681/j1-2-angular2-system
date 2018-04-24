#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: raid_create_handler.py
    @time: 2016/12/1 9:48
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_raid_manager import ARRaidManager


class RaidCreateHandler(BaseHandler):

    @deco_deal_error
    def post(self):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            raid_name = self.get_argument_value('raid_name')
            raid_level = self.get_argument_value('raid_level')
            slot_numbers = self.get_argument_value('slot_numbers')
            strip_size = self.get_argument_value('strip_size')

            result = ARRaidManager().create_raid(raid_name, raid_level,
                                                 slot_numbers, strip_size)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
