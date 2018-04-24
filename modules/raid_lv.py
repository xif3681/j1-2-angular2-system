#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: raid_lv.py
    @time: 2016/12/11 16:07
"""
import re


class Raidlv(object):

    @staticmethod
    def size_patter(size):
        if size.find('t') != -1:
            result = size.replace('t', ' TB')
        elif size.find('g') != -1:
            result = size.replace('g', ' GB')
        elif size.find('m') != -1 or size.find('MB') != -1:
            size_val_str = re.findall('^[0-9]+\.?[0-9]*', size)[0]
            size_val = float(size_val_str) / 1024
            size_val_gb = re.findall('^[0-9]+\.?[0-9]{0,2}', str(size_val))[0]
            size_val_gb_str = '%.2f' % float(size_val_gb)
            result = '{0} GB'.format(size_val_gb_str)
        elif size == '0':
            result = '0 GB'
        else:
            size_unit = re.findall('[a-zA-Z]+', size)[0]
            size_val = re.findall('^[0-9]+\.?[0-9]*', size)[0]
            size_val = '%.2f' % float(size_val)
            result = '{0} {1}'.format(size_val, size_unit)

        return result
