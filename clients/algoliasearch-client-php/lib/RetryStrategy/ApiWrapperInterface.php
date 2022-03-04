<?php

namespace Algolia\AlgoliaSearch\RetryStrategy;

interface ApiWrapperInterface
{
    public function read($method, $path, $requestOptions = [], $defaultRequestOptions = []);

    public function write($method, $path, $data = [], $requestOptions = [], $defaultRequestOptions = []);

    public function send($method, $path, $requestOptions = [], $hosts = null);
}
