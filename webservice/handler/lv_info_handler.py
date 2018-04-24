#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: lv_info_handler.py
    @time: 2016/12/6 18:07
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_lv_manager import ARLvManager


class LvInfoHandler(BaseHandler):

    @deco_deal_error
    def get(self, lv_name):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            result = ARLvManager().get_lv_info(lv_name)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
