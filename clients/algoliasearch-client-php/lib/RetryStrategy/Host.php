<?php

namespace Algolia\AlgoliaSearch\RetryStrategy;

/**
 * @internal
 */
final class Host
{
    private $url;

    private $priority;

    private $up = true;

    private $lastCheck;

    const TTL = 300; // 5 minutes

    public function __construct($url, $priority = 0)
    {
        $this->url = $url;
        $this->priority = $priority;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function getPriority()
    {
        return $this->priority;
    }

    public function isUp()
    {
        if (!$this->up) {
            $this->resetIfExpired();
        }

        return $this->up;
    }

    public function markAsDown()
    {
        $this->up = false;
        $this->lastCheck = time();
    }

    public function reset()
    {
        $this->up = true;
        $this->lastCheck = null;
    }

    private function resetIfExpired()
    {
        $expired = $this->lastCheck + self::TTL < time();

        if ($expired) {
            $this->reset();
        }
    }
}
