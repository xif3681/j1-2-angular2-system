#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: lv_delete_handler.py
    @time: 2016/12/7 15:18
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_lv_manager import ARLvManager


class LvDeleteHandler(BaseHandler):

    @deco_deal_error
    def delete(self, lv_name):
        self.set_header('Access-Control-Allow-Origin', '*')
        lv_name = lv_name.encode('utf-8')

        try:
            result = ARLvManager().delete_lv(lv_name)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
