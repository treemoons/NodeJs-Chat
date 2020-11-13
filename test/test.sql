select  dept_name as CAPITAL_UNIT_NAME 
			                        from tsi0201  where  
			                         dept_code = f.USE_DEPT_ID AND e.company_code='QA01' 
			                             order by dept_code