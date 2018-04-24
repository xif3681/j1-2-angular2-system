#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: router.py
    @time: 2017/1/6 11:17
"""
from handler.container_list_handler import ContainerListHandler
from handler.container_status_handler import ContainerStatusHandler
from handler.container_start_handler import ContainerStartHandler
from handler.container_restart_handler import ContainerRestartHandler
from handler.container_stop_handler import ContainerStopHandler
from handler.container_stats_handler import ContainerStatsHandler
from handler.service_all_handler import ServiceAllHandler
from handler.service_list_handler import ServiceListHandler
from handler.service_status_handler import ServiceStatusHandler
from handler.service_start_handler import ServiceStartHandler
from handler.service_restart_handler import ServiceRestartHandler
from handler.service_stop_handler import ServiceStopHandler
from handler.service_stats_handler import ServiceStatsHandler
from handler.pd_info_handler import PdInfoHandler
from handler.pd_all_info_handler import PdAllInfoHandler
from handler.pd_can_beused_handler import PdCanBeusedHandler
from handler.pd_server_panel_handler import PdServerPanelHandler
from handler.pd_set_hotspare_handler import PdSetHotSpareHandler
from handler.pd_unset_hotspare_handler import PdUnsetHotSpareHandler
from handler.pd_init_handler import PdInitHandler
from handler.pd_init_stop_handler import PdInitStopHandler
from handler.raid_create_handler import RaidCreateHandler
from handler.raid_info_handler import RaidInfoHandler
from handler.raid_allinfo_handler import RaidAllInfoHandler
from handler.raid_can_beused_handler import RaidCanBeusedHandler
from handler.raid_delete_handler import RaidDeleteHandler
from handler.raid_config_handler import RaidConfigHandler
from handler.raid_reconstruct_handler import RaidReconstructHandler
from handler.lv_create_handler import LvCreateHandler
from handler.lv_info_handler import LvInfoHandler
from handler.lv_delete_handler import LvDeleteHandler
from handler.lv_config_handler import LvConfigHandler
from handler.lv_allinfo_handler import LvAllInfoHandler
from handler.get_version_handler import GetVersionHandler

ROUTER = [
    (r'/v1/containers', ContainerListHandler),
    (r'/v1/containers/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/status', ContainerStatusHandler),
    (r'/v1/containers/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/start', ContainerStartHandler),
    (r'/v1/containers/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/restart', ContainerRestartHandler),
    (r'/v1/containers/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/stop', ContainerStopHandler),
    (r'/v1/containers/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/stats', ContainerStatsHandler),

    (r'/v1/allservices', ServiceAllHandler),
    (r'/v1/services', ServiceListHandler),
    (r'/v1/services/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/status', ServiceStatusHandler),
    (r'/v1/services/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/start', ServiceStartHandler),
    (r'/v1/services/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/restart', ServiceRestartHandler),
    (r'/v1/services/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/stop', ServiceStopHandler),
    (r'/v1/services/([a-zA-Z0-9][a-zA-Z0-9_.-]+)/stats', ServiceStatsHandler),

    (r'/v1/pd/([0-9]+)/info', PdInfoHandler),
    (r'/v1/pd/allinfo', PdAllInfoHandler),
    (r'/v1/pd/canbeused', PdCanBeusedHandler),
    (r'/v1/pd/serverpanel', PdServerPanelHandler),
    (r'/v1/pd/sethotspare', PdSetHotSpareHandler),
    (r'/v1/pd/unsethotspare', PdUnsetHotSpareHandler),
    (r'/v1/pd/init', PdInitHandler),
    (r'/v1/pd/initstop', PdInitStopHandler),

    (r'/v1/raid/create', RaidCreateHandler),
    (r'/v1/raid/([0-9]+)/info', RaidInfoHandler),
    (r'/v1/raid/allinfo', RaidAllInfoHandler),
    (r'/v1/raid/([0-9]+)/delete', RaidDeleteHandler),
    (r'/v1/raid/config', RaidConfigHandler),
    (r'/v1/raid/reconstruct', RaidReconstructHandler),
    (r'/v1/raid/canbeused', RaidCanBeusedHandler),

    (r'/v1/lv/create', LvCreateHandler),
    (r'/v1/lv/([a-zA-Z0-9]+)/info', LvInfoHandler),
    (r'/v1/lv/([a-zA-Z0-9]+)/delete', LvDeleteHandler),
    (r'/v1/lv/config', LvConfigHandler),
    (r'/v1/lv/allinfo', LvAllInfoHandler),

    (r'/v1/version', GetVersionHandler)
]
