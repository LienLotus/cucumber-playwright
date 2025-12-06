@smoke @regression
Feature: Add to Cart

  Background:
    Given I login with username "standard_user"

  Scenario: Add Sauce Labs Backpack to the cart
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart icon badge should show "1"
