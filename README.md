
create elasticsearch volume so it will no be destroyed if the container restart
```bash
    docker network create observability 
    mkdir elasticsearch_data

```

create metricbeat file to access our container data
```bash
cd beats/metric
sudo chown root metricbeat.yml 
```

1 - Open kibana:
    localhost:5601

# observability-elasticstack
