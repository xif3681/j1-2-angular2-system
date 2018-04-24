#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: service_all_handler.py
    @time: 2016/10/25 13:52
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_service_manager import ARServiceManager


class ServiceAllHandler(BaseHandler):

    @deco_deal_error
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            import json
            self.write(json.dumps(ARServiceManager.all()))
        except Exception as e:
            self.set_status(202)
            raise e
