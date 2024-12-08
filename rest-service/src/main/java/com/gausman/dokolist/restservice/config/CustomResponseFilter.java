package com.gausman.dokolist.restservice.config;


import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;


@Component
public class CustomResponseFilter implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        exchange.getResponse()
                .getHeaders()
                .add("Access-Control-Allow-Origin", "true");
        return chain.filter(exchange);
    }
}
