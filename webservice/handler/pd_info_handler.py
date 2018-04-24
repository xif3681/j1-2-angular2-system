#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明:Copyright(c) 2014 AnyRobot, EISOO
    文件作者:Tony.fang@eisoo.com
    @file: pd_info_handler.py
    @time: 2016/11/30 17:59
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_pd_manager import ARPdManager


class PdInfoHandler(BaseHandler):

    @deco_deal_error
    def get(self, slot_number):
        self.set_header('Access-Control-Allow-Origin', '*')
        try:
            result = ARPdManager().get_physdrv_info(slot_number)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
