docker restart $1
code=$?

if [ "$code" = "0" ]; then
	echo Successfully restarted server
fi
echo $code
