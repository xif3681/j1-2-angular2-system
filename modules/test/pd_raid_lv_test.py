#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
    版权说明：Copyright (c) 2014 AnyRobot, EISOO
    文件作者: Tony.fang@eisoo.com
    @file: pd_raid_lv_test.py
    @time: 2016/12/21 13:53
"""
from modules.ar_raid_manager import ARRaidStatus
import unittest
import requests
import json


class TestPdRaidLvAPI(unittest.TestCase):
    """
    为了让函数按照想要的执行顺序执行，所以在定义函数名时，加上a...f标识执行顺序
    """
    def setUp(self):
        self._base_url = 'http://192.168.84.17:10000/v1'

    def tearDown(self):
        pass

    def test_pd_a_server_panel(self):
        url = self._base_url + '/pd/serverpanel'
        values = json.loads(requests.get(url).content)

        self.assertIsInstance(values, list)
        for value in values:
            self.assertIn(value['state'], ['green', 'gray', 'red'])

    def test_pd_b_allinfo(self):
        url = self._base_url + '/pd/allinfo'
        values = json.loads(requests.get(url).content)

        self.assertIsInstance(values, list)
        if values:
            one_pd_info = values[0]
            self.assertEqual(len(one_pd_info.keys()), 9)

            if one_pd_info['state'] == 7:
                self.assertIsNotNone(one_pd_info['init'])

    def test_pd_c_info(self):
        url = self._base_url + '/pd/allinfo'
        values = json.loads(requests.get(url).content)

        if values:
            pd_slot_number = values[0]['slot_number']
            url = self._base_url + '/pd/{0}/info'.format(pd_slot_number)
            value = json.loads(requests.get(url).content)

            self.assertIsInstance(value, dict)
            self.assertRegexpMatches(value['capacity'], '^[0-9]+\.?[0-9]{0,2}')

    def test_pd_d_init(self):
        url = self._base_url + '/pd/allinfo'
        values = json.loads(requests.get(url).content)

        if values:
            pd_slot_number = values[0]['slot_number']
            url = self._base_url + '/pd/init'
            data = {
                'slot_number': pd_slot_number
            }
            value = requests.post(url, data=json.dumps(data)).json()

            if value['init_physdrv'] == 1:
                url = self._base_url + '/pd/{0}/info'.format(pd_slot_number)
                physdrv_status = json.loads(requests.get(url).content)['state']
                self.assertEqual(physdrv_status, 7)

    def test_pd_e_initstop(self):
        url = self._base_url + '/pd/allinfo'
        values = json.loads(requests.get(url).content)

        if values:
            pd_slot_number = values[0]['slot_number']
            url = self._base_url + '/pd/initstop'
            data = {
                'slot_number': pd_slot_number
            }
            value = requests.post(url, data=json.dumps(data)).json()

            if value['init_stop_physdrv'] == 1:
                url = self._base_url + '/pd/{0}/info'.format(pd_slot_number)
                physdrv_status = json.loads(requests.get(url).content)['state']
                self.assertNotEqual(physdrv_status, 7)

    def test_pd_f_sethotspare(self):
        url = self._base_url + '/pd/allinfo'
        values = json.loads(requests.get(url).content)

        if values:
            pd_slot_number = values[0]['slot_number']
            url = self._base_url + '/pd/sethotspare'
            data = {
                'slot_number': pd_slot_number
            }
            value = requests.post(url, data=json.dumps(data)).json()

            if value['set_hotspare'] == 1:
                url = self._base_url + '/pd/{0}/info'.format(pd_slot_number)
                physdrv_status = json.loads(requests.get(url).content)['state']
                self.assertEqual(physdrv_status, 2)

    def test_pd_g_unsethotspare(self):
        url = self._base_url + '/pd/allinfo'
        values = json.loads(requests.get(url).content)

        if values:
            pd_slot_number = values[0]['slot_number']
            url = self._base_url + '/pd/unsethotspare'
            data = {
                'slot_number': pd_slot_number
            }
            value = requests.post(url, data=json.dumps(data)).json()

            if value['unset_hotspare'] == 1:
                url = self._base_url + '/pd/{0}/info'.format(pd_slot_number)
                physdrv_status = json.loads(requests.get(url).content)['state']
                self.assertNotEqual(physdrv_status, 2)

    def test_raid_a_allinfo(self):
        url = self._base_url + '/raid/allinfo'
        values = json.loads(requests.get(url).content)
        self.assertIsInstance(values, list)

        if values:
            one_raid_info = values[0]
            self.assertEqual(len(one_raid_info.keys()), 10)

    def test_raid_b_info(self):
        url = self._base_url + '/raid/allinfo'
        values = json.loads(requests.get(url).content)

        if values:
            vir_drv_id = values[0]['vir_drv_id']
            url = self._base_url + '/raid/{0}/info'.format(vir_drv_id)
            raid_info = requests.get(url).json()

            if raid_info['raid_state'] != 1:
                self.assertIsNone(raid_info['recon_completed'])

    def test_raid_c_create(self):
        url = self._base_url + '/pd/canbeused'
        values = json.loads(requests.get(url).content)

        if values:
            url = self._base_url + '/raid/create'
            slot_numbers = []

            for value in values:
                slot_numbers.append(value['slot_number'])

            data = {
                'raid_name': 'raid0000',
                'raid_level': '0',
                'slot_numbers': str(slot_numbers),
                'strip_size': '128'
            }

            result = requests.post(url, data=json.dumps(data)).json()
            if result['create'] == 1:
                self.assertIsNotNone(result['vir_drv_id'])

    def test_raid_d_delete(self):
        url = self._base_url + '/raid/allinfo'
        values = json.loads(requests.get(url).content)

        if values:
            vir_drv_id = values[0]['vir_drv_id']
            url = self._base_url + '/raid/{0}/delete'.format(vir_drv_id)
            result = requests.delete(url).json()

            if result['delete'] == 1:
                url = self._base_url + '/raid/{0}/info'.format(vir_drv_id)
                result = json.loads(requests.get(url).content)
                self.assertEqual(result['message'], 'RAID_NOT_FOUND')

    def test_raid_e_canbeused(self):
        url = self._base_url + '/raid/canbeused'
        result = json.loads(requests.get(url).content)

        if result:
            for val in result:
                self.assertIn(val['raid_state'], [ARRaidStatus.code(ARRaidStatus.OPTIMAL),
                                                  ARRaidStatus.code(ARRaidStatus.DEGRADED)])

    # 创建raid，用于下面的lv测试
    def test_raid_f_create(self):
        url = self._base_url + '/pd/canbeused'
        values = json.loads(requests.get(url).content)

        if values:
            url = self._base_url + '/raid/create'
            slot_numbers = []

            for value in values:
                slot_numbers.append(value['slot_number'])

            data = {
                'raid_name': 'raid0000',
                'raid_level': '0',
                'slot_numbers': str(slot_numbers),
                'strip_size': '128'
            }

            result = requests.post(url, data=json.dumps(data)).json()
            if result['create'] == 1:
                self.assertIsNotNone(result['vir_drv_id'])

    # 测试raid重建

    def test_s_lv_a_allinfo(self):
        url = self._base_url + '/lv/allinfo'
        result = json.loads(requests.get(url).content)

        self.assertIsInstance(result, list)
        if result:
            self.assertEqual(len(result[0]), 8)

    def test_s_lv_b_info(self):
        url = self._base_url + '/lv/allinfo'
        result = json.loads(requests.get(url).content)

        if result:
            lv_name = result[0]['lv_name']
            url = self._base_url + '/lv/{0}/info'.format(lv_name)
            result = requests.get(url).json()
            self.assertIsNotNone(result['raid_name'])
            self.assertEqual(len(result.keys()), 8)

    def test_s_lv_c_create(self):
        url = self._base_url + '/raid/allinfo'
        result = json.loads(requests.get(url).content)

        if result:
            vir_drv_id = result[0]['vir_drv_id']
            url = self._base_url + '/lv/allinfo'
            result = json.loads(requests.get(url).content)

            if result:
                lv_names = []
                for lv in result:
                    lv_names.append(lv['lv_name'])

                lv_name = lv_names[0]
                url = self._base_url + '/lv/create'
                data = {
                    'lv_name': lv_name,
                    'lv_type': 'data',
                    'vir_drv_id': vir_drv_id,
                    'lv_capacity': '10GB'
                }
                result = requests.post(url, data=json.dumps(data)).json()
                self.assertEqual(result['message'], 'LV_NAME_HAS_BEEN_USED')
                lv_name = 'helloworld'

                if lv_name not in lv_names:
                    data = {
                        'lv_name': lv_name,
                        'lv_type': 'data',
                        'vir_drv_id': vir_drv_id,
                        'lv_capacity': '10GB'
                    }
                    result = requests.post(url, data=json.dumps(data)).json()

                    if result['lv_created'] == 1:
                        self.assertIsNotNone(result['lv_name'])

    def test_s_lv_d_delete(self):
        url = self._base_url + '/lv/allinfo'
        result = json.loads(requests.get(url).content)

        if result:
            lv_name = result[0]['lv_name']
            url = self._base_url + '/lv/{0}/delete'.format(lv_name)
            result = requests.delete(url).json()

            if result['lv_deleted'] == 1:
                url = self._base_url + '/lv/{0}/info'.format(result['lv_name'])
                result = json.loads(requests.get(url).content)
                self.assertEqual(result['message'], 'LV_NOT_FOUND')

    # 创建lv，用于lv配置测试
    def test_s_lv_e_create(self):
        url = self._base_url + '/raid/allinfo'
        result = json.loads(requests.get(url).content)

        if result:
            vir_drv_id = result[0]['vir_drv_id']
            url = self._base_url + '/lv/allinfo'
            result = json.loads(requests.get(url).content)

            if result:
                lv_names = []
                for lv in result:
                    lv_names.append(lv['lv_name'])

                lv_name = lv_names[0]
                url = self._base_url + '/lv/create'
                data = {
                    'lv_name': lv_name,
                    'lv_type': 'data',
                    'vir_drv_id': vir_drv_id,
                    'lv_capacity': '10GB'
                }
                result = requests.post(url, data=json.dumps(data)).json()
                self.assertEqual(result['message'], 'LV_NAME_HAS_BEEN_USED')
                lv_name = 'helloworld'

                if lv_name not in lv_names:
                    data = {
                        'lv_name': lv_name,
                        'lv_type': 'data',
                        'vir_drv_id': vir_drv_id,
                        'lv_capacity': '10GB'
                    }
                    result = requests.post(url, data=json.dumps(data)).json()

                    if result['lv_created'] == 1:
                        self.assertIsNotNone(result['lv_name'])

    def test_s_lv_f_config(self):
        url = self._base_url + '/lv/allinfo'
        result = json.loads(requests.get(url).content)

        if result:
            print result[0]
            lv_name = result[0]['lv_name']
            lv_capacity = result[0]['lv_size']
            data = {
                'lv_name': lv_name,
                'lv_name_config': lv_name,
                'lv_capacity': lv_capacity,
                'data_source': '/anyrobot/store/elasticsearch'
            }

            url = self._base_url + '/lv/config'
            result = requests.post(url, data=json.dumps(data)).json()

            if result['config_lv'] == 1:
                self.assertIsNone(result['lv_expand'])
                self.assertIn(result['migrate_data_make_link'], [1, None])

if __name__ == '__main__':
    unittest.main()
