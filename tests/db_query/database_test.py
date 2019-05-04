import unittest
from unittest.mock import patch

import flaskr.db_query.database
from flaskr.db_query.database import Database

class TestDatabase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        self.db = Database()

    def tearDown(self):
        pass

    def test_execute(self):
        # exist
        pass
        # non-exist
        # SQL Inject
        # None
    
    def test_get_table(self):
        self.assertIn("sekolah", self.db.get_table())

    def test_get_column(self):
        # exist
        self.assertIn("jumlah_pd", self.db.get_column("sekolah"))
        # non-exist-column
        self.assertNotIn("jumlah_pd", self.db.get_column("kecamatan"))
        # invalid
        invalid_inputs = ["non_exist_table", "1' or '1'='1", None]
        for i in range(len(invalid_inputs)) :
            with self.subTest(i = i):
                pass
                #with self.assertRaises(TypeError):
                    #self.db.get_column(invalid_inputs[i])