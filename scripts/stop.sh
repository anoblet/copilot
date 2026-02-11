#!/bin/bash
INPUT=$(cat)
REASON=$(echo "$INPUT" | jq -r '.reason')

echo "Session ended: $REASON" >> session.log
# Cleanup temporary files
rm -rf /tmp/session-*
