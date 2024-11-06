// ignore_for_file: file_names
import 'package:app_aep/components/textfield.dart';
import 'package:app_aep/screens/home-page.dart';
import 'package:app_aep/screens/register-page.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  final TextEditingController usernameField = TextEditingController();
  final TextEditingController passwordField = TextEditingController();

  LoginPage({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Tela de Login'),
          backgroundColor: Colors.blue[400],
        ),
        body: Padding(
          padding: const EdgeInsets.fromLTRB(250.0, 115.0, 250.0, 0.0),
          child: Column(
            children: [
              CustomTextField(
                  icon: Icons.account_circle,
                  controller: usernameField,
                  labelText: 'Username',
                  hintText: 'Digite seu username'),
              CustomTextField(
                  icon: Icons.lock_outline,
                  controller: passwordField,
                  labelText: 'Password',
                  hintText: 'Digite sua password'),
              Padding(
                padding: const EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 0.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(context,
                              MaterialPageRoute(builder: (context) {
                            return const HomePage();
                          }));
                        },
                        style: const ButtonStyle(
                          backgroundColor:
                              WidgetStatePropertyAll(Colors.white12),
                          foregroundColor: WidgetStatePropertyAll(Colors.black),
                        ),
                        child: const Text('Acessar'),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(context,
                              MaterialPageRoute(builder: (context) {
                            return RegisterPage();
                          }));
                        },
                        style: const ButtonStyle(
                          backgroundColor:
                              WidgetStatePropertyAll(Colors.white12),
                          foregroundColor: WidgetStatePropertyAll(Colors.black),
                        ),
                        child: const Text('Register'),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
