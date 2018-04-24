#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: container_and_service_manager_test.py
    @time: 2016/9/29 18:03
"""
from modules.ar_container_manager import ARContainerStatus
from modules.ar_service_manager import ARServiceStatus
import unittest
import requests
import json


class TestContainerServiceAPI(unittest.TestCase):
    """
    为了让函数按照想要的执行顺序执行，所以在定义函数名时，加上a...f标识执行顺序
    """
    def setUp(self):
        self._base_url = 'http://127.0.0.1:8081/v1'

    def tearDown(self):
        pass

    def test_container_a_list(self):
        url = self._base_url + '/containers'
        result = json.loads(requests.get(url).content)
        self.assertIsInstance(result, list)

        for element in result:
            self.assertIsInstance(element, dict)

    def test_container_b_status(self):
        url = self._base_url + '/containers/anyrobot-manager/status'
        result = requests.get(url).json()

        self.assertIsInstance(result, dict)
        self.assertIn(result['status'], [ARContainerStatus.code(ARContainerStatus.RUNNING),
                                         ARContainerStatus.code(ARContainerStatus.RESTARTING),
                                         ARContainerStatus.code(ARContainerStatus.EXITED),
                                         ARContainerStatus.code(ARContainerStatus.PAUSED),
                                         ARContainerStatus.code(ARContainerStatus.DEAD)])

        result = requests.post(url).content
        self.assertNotEqual(result.find('405'), -1)

        url_error = self._base_url + '/containers/anyrobot-manager/statuus'
        result = requests.get(url_error).content
        self.assertNotEqual(result.find('404'), -1)

    def test_container_c_start(self):
        url = self._base_url + '/containers/anyrobot-manager/start'
        result = requests.post(url).json()

        self.assertIsInstance(result, dict)
        self.assertEqual(result['name'], 'anyrobot-manager')

    def test_container_d_stop(self):
        url = self._base_url + '/containers/anyrobot-manager/stop'
        result = requests.post(url).json()

        self.assertIsInstance(result, dict)
        self.assertEqual(result['name'], 'anyrobot-manager')

    def test_container_e_restart(self):
        url = self._base_url + '/containers/anyrobot-manager/restart'
        result = requests.post(url).json()

        self.assertIsInstance(result, dict)
        self.assertEqual(result['name'], 'anyrobot-manager')

    def test_container_f_stats(self):
        url = self._base_url + '/containers/anyrobot-manager/stats'
        result = requests.get(url).json()

        self.assertIsInstance(result, dict)
        self.assertRegexpMatches(result['name'], '[a-zA-Z0-9][a-zA-Z0-9_.-]+')
        self.assertIsInstance(result['cpu_percent'], float)
        self.assertIn('mem_percent', result.keys())

    def test_service_a_all(self):
        url = self._base_url + '/allservices'
        result = json.loads(requests.get(url).content)

        for element in result:
            self.assertEqual(len(element.keys()), 6)

    def test_service_b_list(self):
        url = self._base_url + '/services?container=anyrobot-manager'
        result = json.loads(requests.get(url=url).content)

        for element in result:
            self.assertEqual(len(element.keys()), 6)
            self.assertEqual(element['container'], 'anyrobot-manager')
            self.assertIn(element['status'], [ARServiceStatus.code(ARServiceStatus.STOPPED),
                                              ARServiceStatus.code(ARServiceStatus.STARTING),
                                              ARServiceStatus.code(ARServiceStatus.RUNNING),
                                              ARServiceStatus.code(ARServiceStatus.BACKOFF),
                                              ARServiceStatus.code(ARServiceStatus.STOPPING),
                                              ARServiceStatus.code(ARServiceStatus.EXITED),
                                              ARServiceStatus.code(ARServiceStatus.FATAL)])

    def test_service_c_status(self):
        url = self._base_url + '/services/mysql/status?container=anyrobot-manager'
        result = requests.get(url=url).json()

        self.assertIsInstance(result, dict)
        self.assertEqual(result['name'], 'mysql')
        self.assertEqual(result['container'], 'anyrobot-manager')

        if result['status'] == 'STOPPED':
            self.assertEqual(result['pid'], -1)

    def test_service_d_start(self):
        url = self._base_url + '/services/mysql/start'
        data = {
            'container': 'anyrobot-manager',
        }

        print 'hello world'
        result = requests.post(url, data=json.dumps(data)).json()

        self.assertIsInstance(result, dict)
        self.assertNotEqual(result['pid'], -1)
        self.assertEqual(result['name'], 'mysql')
        self.assertEqual(result['container'], 'anyrobot-manager')

    def test_service_e_stop(self):
        url = self._base_url + '/services/mysql/stop'
        data = {
            'container': 'anyrobot-manager',
        }

        result = requests.post(url, data=json.dumps(data)).json()

        self.assertIsInstance(result, dict)
        self.assertNotEqual(result['pid'], 0)
        self.assertEqual(result['name'], 'mysql')

    def test_service_f_restart(self):
        url = self._base_url + '/services/mysql/restart'
        data = {
            'container': 'anyrobot-manager',
        }

        result = requests.post(url, data=json.dumps(data)).json()

        self.assertIsInstance(result, dict)
        self.assertEqual(result['name'], 'mysql')
        self.assertEqual(result['container'], 'anyrobot-manager')
        self.assertRegexpMatches(result['name'], '[a-zA-Z0-9][a-zA-Z0-9_.-]+')

    def test_service_g_stats(self):
        url = self._base_url + '/services/mysql/stats?container=anyrobot-manager'
        result = requests.get(url=url).json()

        self.assertIsInstance(result, dict)
        self.assertEqual(result['name'], 'mysql')
        self.assertIsInstance(result['cpu_percent'], float)
        self.assertIsInstance(result['mem_percent'], float)

        if result['pid'] == -1:
            self.assertEqual(result['cpu_percent'], 0.0)
            self.assertEqual(result['mem_percent'], 0.0)

if __name__ == '__main__':
    unittest.main()
