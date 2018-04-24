#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: service_stats_handler.py
    @time: 2016/9/21 11:01
"""
from arpylibs.basehandler.base_handler import BaseHandler
from modules.ar_container_manager import ARContainerManager
from modules.deco_deal_error import deco_deal_error
from modules.ar_service_manager import ARServiceManager
from utils.error.ar_exception import ARContainerException
from utils.error.status_pool import ContainerStatusPool


class ServiceStatsHandler(BaseHandler):

    @deco_deal_error
    def get(self, server_name):
        self.set_header('Access-Control-Allow-Origin', '*')

        try:
            container = ARContainerManager.get_container_name(self.
                                                              get_argument_value('container'))
            containers_names = ARContainerManager.get_all_containers_names()

            if container in containers_names:
                ar_service_manager = ARServiceManager(container)
                result = ar_service_manager.stats(server_name)
                self.write(result)
            else:
                raise ARContainerException(ContainerStatusPool.ID_CONTAINER_DOES_NOT_EXIST)
        except Exception as e:
            self.set_status(202)
            raise e
