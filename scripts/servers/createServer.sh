#!/bin/bash
data=`echo $1 | python -m json.tool`

getJson() {
	echo `echo $data | jq ".$1" | tr -d '"'`
}

name=$(getJson name)
image=$(getJson image)
port=$(getJson port)
localPort=$(getJson localPort)
path=$(getJson path)

# TODO: Add GitHub support

serverPath="$path/$name"
dataPath="$serverPath:/data"
env=`echo $data | jq '.env | keys[]'`

# Generate params
params="-dit "
params+="--name $name "
params+="-p $port:$localPort "
params+="-v $dataPath "
for key in $env
do
	key=`echo $key | tr -d '"'`
	value=`echo $data | jq .env.$key | tr -d '"'`
	param="-e $key=$value "
	params+=$param
done
params+=$image

# Run new Docker container, return error if something goes wrong
docker run $params
code=$?

if [ "$code" = "0" ]; then
	id=`docker ps -f name=$name -q`
	rm $serverPath/homestead.json
	echo $data | jq ". + {id:\"$id\"}" | python -m json.tool >> $serverPath/homestead.json
	echo Successfully created server
fi
echo $code
