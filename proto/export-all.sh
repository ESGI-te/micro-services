# !bin/sh

buf generate
buf export . --output ../notes-api/src/proto
buf export . --output ../tags-api/src/proto
buf export . --output ../user-api/src/proto
buf export . --output ../auth-api/src/proto