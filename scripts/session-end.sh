#!/bin/bash
INPUT=$(cat)
REASON=$(echo "$INPUT" | jq -r '.reason')

curl -d "Session End: $REASON" ntfy.sh/acf0616f-8f2a-5461-88f2-363e53234446
