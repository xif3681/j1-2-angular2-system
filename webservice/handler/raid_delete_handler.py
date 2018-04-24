#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: raid_delete_handler.py
    @time: 2016/12/2 13:40
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_raid_manager import ARRaidManager


class RaidDeleteHandler(BaseHandler):

    @deco_deal_error
    def delete(self, vir_drv_id):
        self.set_header('Access-Control-Allow-Origin', '*')
        vir_drv_id = vir_drv_id.encode('utf-8')

        try:
            result = ARRaidManager().delete_raid(vir_drv_id)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
