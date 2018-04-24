#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: lv_create_handler.py
    @time: 2016/12/5 16:15
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_lv_manager import ARLvManager


class LvCreateHandler(BaseHandler):

    @deco_deal_error
    def post(self):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            lv_name = self.get_argument_value('lv_name')
            lv_type = self.get_argument_value('lv_type')
            vir_drv_id = self.get_argument_value('vir_drv_id')
            lv_capacity = self.get_argument_value('lv_capacity')

            result = ARLvManager().create_lv(lv_name, lv_type, vir_drv_id, lv_capacity)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
