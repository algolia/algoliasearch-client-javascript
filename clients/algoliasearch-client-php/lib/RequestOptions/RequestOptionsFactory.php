<?php

namespace Algolia\AlgoliaSearch\RequestOptions;

use Algolia\AlgoliaSearch\Configuration\Configuration;
use Algolia\AlgoliaSearch\Support\UserAgent;

final class RequestOptionsFactory
{
    private $config;

    private $validQueryParameters = [
        'forwardToReplicas',
        'replaceExistingSynonyms',
        'clearExistingRules',
        'getVersion',
    ];

    private $validHeaders = [
        'Content-type',
        'User-Agent',
        'createIfNotExists',
    ];

    public function __construct(Configuration $config)
    {
        $this->config = $config;
    }

    /**
     * @param \Algolia\AlgoliaSearch\RequestOptions\RequestOptions|array $options
     * @param array                                                      $defaults
     *
     * @return \Algolia\AlgoliaSearch\RequestOptions\RequestOptions
     */
    public function create($options, $defaults = [])
    {
        if (is_array($options)) {
            $options += $defaults;
            $options = $this->format($options);
            $options = $this->normalize($options);

            $options = new RequestOptions($options);
        } elseif ($options instanceof RequestOptions) {
            $defaults = $this->create($defaults);
            $options->addDefaultHeaders($defaults->getHeaders());
            $options->addDefaultQueryParameters($defaults->getQueryParameters());
            $options->addDefaultBodyParameters($defaults->getBody());
        } else {
            throw new \InvalidArgumentException('RequestOptions can only be created from array or from RequestOptions object');
        }

        return $options->addDefaultHeaders($this->config->getDefaultHeaders());
    }

    public function createBodyLess($options, $defaults = [])
    {
        $options = $this->create($options, $defaults);

        return $options
            ->addQueryParameters($options->getBody())
            ->setBody([]);
    }

    private function normalize($options)
    {
        $normalized = [
            'headers' => [
                'X-Algolia-Application-Id' => $this->config->getAppId(),
                'X-Algolia-API-Key' => $this->config->getAlgoliaApiKey(),
                'User-Agent' => $this->config->getUserAgent() !== null ?
                  $this->config->getUserAgent() :
                  UserAgent::get(),
                'Content-Type' => 'application/json',
            ],
            'query' => [],
            'body' => [],
            'readTimeout' => $this->config->getReadTimeout(),
            'writeTimeout' => $this->config->getWriteTimeout(),
            'connectTimeout' => $this->config->getConnectTimeout(),
        ];

        foreach ($options as $optionName => $value) {
            $type = $this->getOptionType($optionName);

            if (in_array($type, ['readTimeout', 'writeTimeout', 'connectTimeout'], true)) {
                $normalized[$type] = $value;
            } else {
                $normalized[$type][$optionName] = $value;
            }
        }

        return $normalized;
    }

    private function format($options)
    {
        foreach ($options as $name => $value) {
            if (in_array($name, ['attributesToRetrieve', 'type'], true)) {
                if (is_array($value)) {
                    $options[$name] = implode(',', $value);
                }
            }
        }

        return $options;
    }

    private function getOptionType($optionName)
    {
        if ($this->isValidHeaderName($optionName)) {
            return 'headers';
        } elseif (in_array($optionName, $this->validQueryParameters, true)) {
            return 'query';
        } elseif (in_array($optionName, ['connectTimeout', 'readTimeout', 'writeTimeout'], true)) {
            return $optionName;
        }

        return 'body';
    }

    private function isValidHeaderName($name)
    {
        if (preg_match('/^X-[a-zA-Z-]+/', $name)) {
            return true;
        }

        if (in_array($name, $this->validHeaders, true)) {
            return true;
        }

        return false;
    }
}
