import unittest
from unittest import TestSuite

import tests.db_query.database_test
from tests.db_query.database_test import TestDatabase

def suite_database():
    suite = unittest.TestSuite()
    suite.addTest(TestDatabase('test_execute'))
    suite.addTest(TestDatabase('test_get_table'))
    suite.addTest(TestDatabase('test_get_column'))
    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite_database())
    unittest.main()