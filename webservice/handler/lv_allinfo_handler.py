#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: lv_allinfo_handler.py
    @time: 2016/12/8 14:58
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_lv_manager import ARLvManager


class LvAllInfoHandler(BaseHandler):

    @deco_deal_error
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            result = ARLvManager().get_all_lv_info()
            import json
            self.write(json.dumps(result))
        except Exception as e:
            self.set_status(202)
            raise e
