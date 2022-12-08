#Add custom ID column to database

We want to have a Facility generated ID as part of each agent's metadata. This could be implemented as a column added to the database of type `VARCHAR(n)`.
For example, 
```sql
ALTER TABLE Agents
ADD COLUMN custom_id VARCHAR(24)
```
There should also be a stored procedure created to allow for updating of the new column based on a match criteria, such as agent's name.
For example, 
```sql
CREATE PROCEDURE update_agent(
    agent_name_arg string,
    custom_id_arg string,
)
LANGUAGE sql
begin
    UPDATE agents
    SET custom_id = custom_id_arg
    WHERE agent_name = agent_name_arg 
end
```

**Acceptance criteria:**
Stored procedure can be called with existing field and custom_id parameters and then the database row can be retreived based on the custom_id.

**Estimated time:**
1 day