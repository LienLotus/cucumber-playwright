@regression
Feature: Checkout Flow

  Background:
    Given I login with username "standard_user"

  Scenario: Successful checkout with 1 item
    Given I have 1 item in the cart
    When I proceed to checkout and enter details
    Then I should see the order confirmation message
