#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: container_stats_handler.py
    @time: 2016/9/5 13:14
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.deco_deal_error import deco_deal_error
from modules.ar_container_manager import ARContainerManager


class ContainerStatusHandler(BaseHandler):

    @deco_deal_error
    def get(self, container_id_or_name):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            ar_container_manager = ARContainerManager()
            result = ar_container_manager.status(container_id_or_name)
            self.write(result)
        except Exception as e:
            self.set_status(202)
            raise e
