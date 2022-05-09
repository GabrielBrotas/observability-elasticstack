
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

## Beats
https://www.elastic.co/beats/


**Metricbeat** <br >

1 - Open kibana:
    localhost:5601

    # dashboard
    Analytics -> Dashboard -> Search: Docker

    # analytics
    Observability -> Metrics -> Show: Docker containers
    Analytics -> Discover 


**Heartbeat**
1 - create the simplego-api container (or any container but update the name on beats/heartbeat/heartbeat.yml)
2 - uptime -> verify services
    localhost:5601
    Observability -> Uptime

**APM** with RUM
allow us to stacktrace the application logs, errors, and more


install the agent to monitor the application
https://www.elastic.co/guide/en/apm/agent/index.html
    Observability -> APM

