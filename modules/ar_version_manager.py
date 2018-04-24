#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import json

from arpylibs.basehandler.base_handler import BaseHandler


class ARVersionManager(object):
    def get_anyrobot_version(self):
        result = {}
        anyrobot_version_file = "/anyrobot/version.json"
        try:
            anyrobot_version = json.loads(open(anyrobot_version_file).read())

        except Exception as e:
            raise e

        result['anyrobot_major'] = anyrobot_version['major']
        result['anyrobot_minor'] = anyrobot_version['minor']
        result['anyrobot_reversion'] = anyrobot_version['revision']
        result['anyrobot_build'] = anyrobot_version['build']
        result['anyrobot_buildDate'] = anyrobot_version['buildDate']

        return result

    def get_all_version(self):
        result = self.get_anyrobot_version()
        system_manage_version_file = "/anyrobot/system_manage/version.json"
        try:
            system_manage_version = json.loads(open(system_manage_version_file).read())

        except Exception as e:
            raise e

        result['system-manager_major'] = system_manage_version['major']
        result['system-manager_minor'] = system_manage_version['minor']
        result['system-manager_revision'] = system_manage_version['revision']
        result['system-manager_build'] = system_manage_version['build']
        result['system-manager_buildDate'] = system_manage_version['buildDate']

        anyrobot_containers = ["anyrobot-proxy", "anyrobot-web", "anyrobot-manager", "anyrobot-etl", "anyrobot-store"]

        for each_container in anyrobot_containers:
            version = json.loads(os.popen("docker exec " + each_container + " version").read())
            result[each_container + '_major'] = version['major']
            result[each_container + '_minor'] = version['minor']
            result[each_container + '_revision'] = version['revision']
            result[each_container + '_build'] = version['build']
            result[each_container + '_buildDate'] = version['buildDate']

        return result