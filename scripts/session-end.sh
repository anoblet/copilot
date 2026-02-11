#!/bin/bash
INPUT=$(cat)
REASON=$(echo "$INPUT" | jq -r '.reason')

echo "Session ended: $REASON" >> session.log
# Cleanup temporary files
rm -rf /tmp/session-*

curl -d "Stop: $REASON" ntfy.sh/acf0616f-8f2a-5461-88f2-363e53234446
