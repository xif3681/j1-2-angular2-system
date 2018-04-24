#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: deco_deal_error.py
    @time: 2016/9/21 15:19
"""
from arpylibs.base_error import ARBaseError
from arpylibs.basehandler.handler_result import HandlerResult


def deco_deal_error(func):
    def wrapper(self, *args, **kwargs):
        try:
            func(self, *args, **kwargs)
        except ARBaseError as exp:
            return_result = HandlerResult(exp.get_error_id(),
                                          exp.get_message(),
                                          data=None).to_json()

            self.write(return_result)
        except Exception as exp:
            return_result = HandlerResult(1, 'system error',
                                          data={'detail': exp.message}).to_json()

            self.write(return_result)

    return wrapper
