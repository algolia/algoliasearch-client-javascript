<?php

namespace Algolia\AlgoliaSearch\RequestOptions;

use Algolia\AlgoliaSearch\Support\Helpers;

final class RequestOptions
{
    private $headers = [];

    private $query = [];

    private $body = [];

    private $readTimeout;

    private $writeTimeout;

    private $connectTimeout;

    public function __construct(array $options = [])
    {
        foreach (['headers', 'query', 'body'] as $name) {
            if (isset($options[$name]) && !empty($options[$name])) {
                $this->{$name} = $options[$name];
            }
        }

        $this->readTimeout = $options['readTimeout'];
        $this->writeTimeout = $options['writeTimeout'];
        $this->connectTimeout = $options['connectTimeout'];
    }

    /**
     * Get the HTTP headers to add to the request.
     *
     * @return array List of name/value pairs
     */
    public function getHeaders()
    {
        return $this->headers;
    }

    /**
     * Add a header to the list. If a value already exists for that name, it will be overwritten.
     *
     * @param string $name  Name of the header
     * @param string $value Value of the header
     *
     * @return $this
     */
    public function addHeader($name, $value)
    {
        $this->headers[$name] = $value;

        return $this;
    }

    /**
     * @param $headers
     *
     * @return $this
     */
    public function addHeaders($headers)
    {
        $this->headers = array_merge($this->headers, $headers);

        return $this;
    }

    /**
     * Add a new header to the list if there is no value already set.
     *
     * @param string $name  Name of the header
     * @param string $value Value of the header
     *
     * @return $this
     */
    public function addDefaultHeader($name, $value)
    {
        if (!isset($this->headers[$name])) {
            $this->headers[$name] = $value;
        }

        return $this;
    }

    /**
     * Add the headers passed if the value isn't already set.
     *
     * @param array $headers List of header name/value pairs
     *
     * @return $this
     */
    public function addDefaultHeaders($headers)
    {
        foreach ($headers as $name => $value) {
            $this->addDefaultHeader($name, $value);
        }

        return $this;
    }

    /**
     * Replace all existing headers with the given name/value pairs.
     *
     * @param array $headers List of header name/value pairs
     *
     * @return $this
     */
    public function setHeaders($headers)
    {
        $this->headers = $headers;

        return $this;
    }

    /**
     * @return array List of name/value query parameters
     */
    public function getQueryParameters()
    {
        return $this->query;
    }

    /**
     * @return string URL-encoded query string
     */
    public function getBuiltQueryParameters()
    {
        return Helpers::buildQuery($this->query);
    }

    /**
     * Add a query parameter. If a value already exists for that name, it will be overwritten.
     *
     * @param string $name
     * @param string $value
     *
     * @return $this
     */
    public function addQueryParameter($name, $value)
    {
        $this->query[$name] = $value;

        return $this;
    }

    /**
     * Add a list of query parameters name/value pairs.
     * If a value already exists for a name, it will be overwritten.
     *
     * @param $parameters
     *
     * @return $this
     */
    public function addQueryParameters($parameters)
    {
        $this->query = array_merge($this->query, $parameters);

        return $this;
    }

    /**
     * Add a query parameter if it isn't already set.
     *
     * @param string $name  Name of the query parameter
     * @param string $value Value of the query parameter
     *
     * @return $this
     */
    public function addDefaultQueryParameter($name, $value)
    {
        if (!isset($this->query[$name])) {
            $this->query[$name] = $value;
        }

        return $this;
    }

    /**
     * Add parameters if they aren't already set.
     *
     * @param array $queryParameters Query parameters name/value pairs
     *
     * @return $this
     */
    public function addDefaultQueryParameters($queryParameters)
    {
        foreach ($queryParameters as $name => $value) {
            $this->addDefaultQueryParameter($name, $value);
        }

        return $this;
    }

    /**
     * Replace all existing query parameters with the given name/value pairs.
     *
     * @param array $queryParameters
     *
     * @return $this
     */
    public function setQueryParameters($queryParameters)
    {
        $this->query = $queryParameters;

        return $this;
    }

    /**
     * Get HTTP body to add.
     *
     * @return array
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Add a body parameter. If a value already exists for that name, it will be overwritten.
     *
     * @param string $name
     * @param mixed  $value
     *
     * @return $this
     */
    public function addBodyParameter($name, $value)
    {
        $this->body[$name] = $value;

        return $this;
    }

    /**
     * Add parameters if they aren't already set.
     *
     * @param array $parameters Body parameters name/value pairs
     *
     * @return $this
     */
    public function addBodyParameters($parameters)
    {
        $this->body = array_merge($this->body, $parameters);

        return $this;
    }

    /**
     * Add a body parameter if it isn't already set.
     *
     * @param string $name  Name of the query parameter
     * @param string $value Value of the query parameter
     *
     * @return $this
     */
    public function addDefaultBodyParameter($name, $value)
    {
        if (!isset($this->body[$name])) {
            $this->body[$name] = $value;
        }

        return $this;
    }

    /**
     * Add parameters if they aren't already set.
     *
     * @param array $parameters Body parameters name/value pairs
     *
     * @return $this
     */
    public function addDefaultBodyParameters($parameters)
    {
        foreach ($parameters as $name => $value) {
            $this->addDefaultBodyParameter($name, $value);
        }

        return $this;
    }

    /**
     * Replace all existing body parameters with the given name/value pairs.
     *
     * @param $body
     *
     * @return $this
     */
    public function setBody($body)
    {
        $this->body = $body;

        return $this;
    }

    /**
     * Get timeout for read operations.
     *
     * @return int Timeout in seconds
     */
    public function getReadTimeout()
    {
        return $this->readTimeout;
    }

    /**
     * Set timeout for read operations.
     *
     * @param int $readTimeout Timeout in seconds
     *
     * @return $this
     */
    public function setReadTimeout($readTimeout)
    {
        $this->readTimeout = $readTimeout;

        return $this;
    }

    /**
     * Get timeout for write operations.
     *
     * @return int Timeout in seconds
     */
    public function getWriteTimeout()
    {
        return $this->writeTimeout;
    }

    /**
     * Set timeout for write operations.
     *
     * @param int $writeTimeout Timeout in seconds
     *
     * @return $this
     */
    public function setWriteTimeout($writeTimeout)
    {
        $this->writeTimeout = $writeTimeout;

        return $this;
    }

    /**
     * Get connect timeout.
     *
     * @return int Connect timeout in seconds
     */
    public function getConnectTimeout()
    {
        return $this->connectTimeout;
    }

    /**
     * Set connect timeout.
     *
     * @param $connectTimeout Connect timeout in seconds
     *
     * @return $this
     */
    public function setConnectTimeout($connectTimeout)
    {
        $this->connectTimeout = $connectTimeout;

        return $this;
    }
}
