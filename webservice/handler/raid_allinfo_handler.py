#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: raid_allinfo_handler.py
    @time: 2016/12/2 13:24
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_raid_manager import ARRaidManager


class RaidAllInfoHandler(BaseHandler):

    @deco_deal_error
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        try:
            result = ARRaidManager().get_all_raid_info()
            import json
            self.write(json.dumps(result))
        except Exception as e:
            self.set_status(202)
            raise e
