#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: ar_exception.py
    @time: 2017/1/5 19:53
"""
from status_pool import ContainerStatusPool, \
    ServiceStatusPool, PdStatusPool, RaidStatusPool, LvStatusPool
from arpylibs.base_error import ARBaseErrorException


class ARContainerException(ARBaseErrorException):
    """
        容器模块异常类
    """
    def __init__(self, status_info, *args):
        super(ARContainerException, self).__init__(ContainerStatusPool.MODULE_CODE,
                                                   status_info[0],
                                                   status_info[1],
                                                   *args)


class ARServiceException(ARBaseErrorException):
    """
        服务模块异常类
    """
    def __init__(self, status_info, *args):
        super(ARServiceException, self).__init__(ServiceStatusPool.MODULE_CODE,
                                                 status_info[0],
                                                 status_info[1],
                                                 *args)


class ARPdException(ARBaseErrorException):
    """
        物理磁盘异常类
    """
    def __init__(self, status_info, *args):
        super(ARPdException, self).__init__(PdStatusPool.MODULE_CODE,
                                            status_info[0],
                                            status_info[1],
                                            *args)


class ARRaidException(ARBaseErrorException):
    """
        磁盘阵列异常类
    """
    def __init__(self, status_info, *args):
        super(ARRaidException, self).__init__(RaidStatusPool.MODULE_CODE,
                                              status_info[0],
                                              status_info[1],
                                              *args)


class ARLvException(ARBaseErrorException):
    """
        逻辑卷异常类
    """
    def __init__(self, status_info, *args):
        super(ARLvException, self).__init__(LvStatusPool.MODULE_CODE,
                                            status_info[0],
                                            status_info[1],
                                            *args)
