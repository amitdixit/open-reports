namespace ReportServer.Infrastructure;

public class Class1
{

}

/*
CREATE TABLE reports(
id UUID PRIMARY KEY,
name TEXT NOT NULL,
schema_version TEXT NOT NULL,
definition_json JSONB NOT NULL,
created_at_utc TIMESTAMPTZ NOT NULL,
modified_at_utc TIMESTAMPTZ NOT NULL
);

CREATE INDEX ix_reports_name ON reports(name);

*/