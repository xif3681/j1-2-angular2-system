#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: status_pool.py
    @time: 2017/1/5 15:29
"""
from arpylibs.statuscode.module_code_def import ModuleCode


class ContainerStatusPool(object):
    """
        容器错误码
    """
    MODULE_CODE = ModuleCode.MC_AR_CONTAINER_MANAGER

    ID_DOCKER_SERVICE_CAN_NOT_LINK = [1, 'ID_DOCKER_SERVICE_CAN_NOT_LINK']
    ID_SERVER_ERROR = [2, 'ID_SERVER_ERROR']
    ID_CONTAINER_IN_DEAD = [3, 'ID_CONTAINER_IN_DEAD']
    ID_CONTAINER_DOES_NOT_EXIST = [4, 'ID_CONTAINER_DOES_NOT_EXIST']


class ServiceStatusPool(object):
    """
        服务错误码
    """
    MODULE_CODE = ModuleCode.MC_AR_SERVICE_MANAGER

    ID_LINK_ERROR = [1, 'ID_LINK_ERROR']
    ID_OPERATE_SERVICE_EXIST_FAULT = [2, 'ID_OPERATE_SERVICE_EXIST_FAULT']
    ID_SERVICE_STATUS_IN_FATAL = [3, 'ID_SERVICE_STATUS_IN_FATAL']
    ID_SERVER_ERROR = [4, 'ID_SERVER_ERROR']


class PdStatusPool(object):
    """
        物理磁盘错误码
    """
    MODULE_CODE = ModuleCode.MC_AR_PD_MANAGER

    ID_MEGACLI_NOT_FOUND = [1, 'ID_MEGACLI_NOT_FOUND']
    ID_SLOT_NUMBER_INVALID = [2, 'ID_SLOT_NUMBER_INVALID']
    ID_SERVER_ERROR = [3, 'ID_SERVER_ERROR']


class RaidStatusPool(object):
    """
        磁盘阵列错误码
    """
    MODULE_CODE = ModuleCode.MC_AR_RAID_MANAGER

    ID_MEGACLI_NOT_FOUND = [1, 'ID_MEGACLI_NOT_FOUND']
    ID_INVALID_COMMAND = [2, 'ID_INVALID_COMMAND']
    ID_MAXIMUM_LDS_ALREADY_CONFIGURED = [3, 'ID_MAXIMUM_LDS_ALREADY_CONFIGURED']
    ID_RAID_NAME_HAS_BEEN_USED = [4, 'ID_RAID_NAME_HAS_BEEN_USED']
    ID_RAID_LEVEL_OR_DISK_NUMBER_OR_STRIPSZ_ERROR = [5, 'ID_RAID_LEVEL_OR_DISK_NUMBER_OR_STRIPSZ_ERROR']
    ID_RAID_NOT_FOUND = [6, 'ID_RAID_NOT_FOUND']
    ID_RECONSTRUCTION_IN_PROGRESS = [7, 'ID_RECONSTRUCTION_IN_PROGRESS']
    ID_RAID_HAS_LV = [8, 'ID_RAID_HAS_LV']
    ID_RAID_CAN_NOT_RECONSTRUCT = [9, 'ID_RAID_CAN_NOT_RECONSTRUCT']
    ID_EXISTS_RAID_RECON = [10, 'ID_EXISTS_RAID_RECON']
    ID_SERVER_ERROR = [11, 'ID_SERVER_ERROR']


class LvStatusPool(object):
    """
        逻辑卷错误码
    """
    MODULE_CODE = ModuleCode.MC_AR_LV_MANAGER

    ID_LV_NAME_HAS_BEEN_USED = [1, 'ID_LV_NAME_HAS_BEEN_USED']
    ID_LV_NOT_FOUND = [2, 'ID_LV_NOT_FOUND']
    ID_INVALID_LV_CAPACITY = [3, 'ID_INVALID_LV_CAPACITY']
    ID_LV_HAS_LINK_DATA_SOURCE = [4, 'ID_LV_HAS_LINK_DATA_SOURCE']
    ID_DATA_SOURCE_HAS_BEEN_USED = [5, 'ID_DATA_SOURCE_HAS_BEEN_USED']
    ID_LV_IS_CREATING = [6, 'ID_LV_IS_CREATING']
    ID_SERVER_ERROR = [7, 'ID_SERVER_ERROR']


MODULE_LIST = [ContainerStatusPool,
               ServiceStatusPool,
               PdStatusPool,
               RaidStatusPool,
               LvStatusPool]
