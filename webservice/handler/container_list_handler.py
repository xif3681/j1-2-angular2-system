#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: container_list_handler.py
    @time: 2016/9/21 10:41
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.ar_container_manager import ARContainerManager
from modules.deco_deal_error import deco_deal_error


class ContainerListHandler(BaseHandler):

    @deco_deal_error
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            ar_container_manager = ARContainerManager()
            results = ar_container_manager.list()
            import json
            self.write(json.dumps(results))
        except Exception as e:
            self.set_status(202)
            raise e
