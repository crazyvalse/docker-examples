#
docker run -p 5710:5710 --name=adp01 adp

#

docker run -p 5710:5701 --name=adp02 \
-v $(pwd)/volume/dist:/dist \
-v $(pwd)/volume/public:/public \
adp
