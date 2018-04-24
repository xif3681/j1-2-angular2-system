#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: megacli.py
    @time: 2016/11/30 9:57
"""

import os
import re
import subprocess


class MegacliError(Exception):
    pass


class Megacli(object):
    def __init__(self, cli_path='/opt/MegaRAID/MegaCli/MegaCli64'):
        self.cli_path = cli_path

        if not os.path.exists(cli_path):
            raise MegacliError('{0} not found'.format(cli_path))

    def execute(self, cmd):
        proc = subprocess.Popen('{0} {1}'.format(self.cli_path, cmd), shell=True, stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE)
        out, err = proc.communicate()

        return [re.sub(':$', '', re.sub('\s*:\s*', ':', re.sub('(^\s*|\s*$)', '', line))) for line in
                filter(None, out.rstrip().split("\n"))]
