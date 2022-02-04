<?php

namespace Algolia\AlgoliaSearch\Exceptions;

use Psr\Http\Message\RequestInterface;

class RequestException extends AlgoliaException
{
    private $request;

    public function setRequest(RequestInterface $request)
    {
        $this->request = $request;

        return $this;
    }

    public function getRequest()
    {
        return $this->request;
    }
}
