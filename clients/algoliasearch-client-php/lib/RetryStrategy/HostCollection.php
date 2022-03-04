<?php

namespace Algolia\AlgoliaSearch\RetryStrategy;

/**
 * @internal
 */
final class HostCollection
{
    private $hosts;

    public function __construct(array $hosts)
    {
        $this->hosts = $hosts;

        $this->shuffle();
    }

    public static function create(array $urlsWithPriority)
    {
        $hosts = [];
        foreach ($urlsWithPriority as $url => $priority) {
            $hosts[] = new Host($url, $priority);
        }

        return new static($hosts);
    }

    public function get()
    {
        // We pass the result through array_values because sometimes
        // we need to make sure you can access the first element
        // via $result[0]
        return array_values(array_filter($this->hosts, function (Host $host) {
            return $host->isUp();
        }));
    }

    public function getUrls()
    {
        return array_map(function (Host $host) {
            return $host->getUrl();
        }, $this->get());
    }

    public function markAsDown($hostKey)
    {
        array_map(function (Host $host) use ($hostKey) {
            if ($host->getUrl() === $hostKey) {
                $host->markAsDown();
            }
        }, $this->hosts);
    }

    public function shuffle()
    {
        if (shuffle($this->hosts)) {
            $this->sort();
        }

        return $this;
    }

    public function reset()
    {
        foreach ($this->hosts as $host) {
            $host->reset();
        }

        return $this;
    }

    private function sort()
    {
        usort($this->hosts, function (Host $a, Host $b) {
            $prioA = $a->getPriority();
            $prioB = $b->getPriority();
            if ($prioA === $prioB) {
                return 0;
            }

            return ($prioA > $prioB) ? -1 : 1;
        });
    }
}
