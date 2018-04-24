#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: pd_init_handler.py
    @time: 2016/12/9 10:42
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_pd_manager import ARPdManager


class PdInitHandler(BaseHandler):

    @deco_deal_error
    def post(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        try:
            slot_number = self.get_argument_value('slot_number')
            result = ARPdManager().init_physdrv(slot_number)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
