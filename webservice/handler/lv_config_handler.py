#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: lv_config_handler.py
    @time: 2016/12/7 16:39
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_lv_manager import ARLvManager


class LvConfigHandler(BaseHandler):

    @deco_deal_error
    def post(self):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            lv_name = self.get_argument_value('lv_name')
            lv_name_config = self.get_argument_value('lv_name_config')
            lv_capacity = self.get_argument_value('lv_capacity')
            data_source = self.get_argument_value('data_source')

            result = ARLvManager().config_lv(lv_name, lv_name_config, lv_capacity, data_source)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
