@smoke @regression
Feature: Login

  Scenario: Successful Login
    Given I open the SauceDemo login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Products page

  Scenario: Invalid Login with locked out user
    When I login with username "locked_out_user"
    Then I should see an error message
