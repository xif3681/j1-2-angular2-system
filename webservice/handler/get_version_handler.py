#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2016 AnyRobot, EISOO
    文件作者: wang.zhikun@eisoo.com
    @file: get_version_handler.py
    @time: 2016/12/14 11:31
"""

import json

from arpylibs.basehandler.base_handler import BaseHandler
from modules.ar_version_manager import ARVersionManager


class GetVersionHandler(BaseHandler):
    def get(self):
        try:
            result = ARVersionManager().get_anyrobot_version()

        except Exception as e:
            self.set_status(500)
            raise e

        self.write(json.dumps(result))
