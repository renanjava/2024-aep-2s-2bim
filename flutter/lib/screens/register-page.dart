// ignore_for_file: file_names
import 'package:app_aep/components/textfield.dart';
import 'package:app_aep/screens/home-page.dart';
import 'package:app_aep/screens/login-page.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatelessWidget {
  final TextEditingController usernameField = TextEditingController();
  final TextEditingController emailField = TextEditingController();
  final TextEditingController passwordField = TextEditingController();

  RegisterPage({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Tela de Register'),
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
              CustomTextField(
                icon: Icons.email_outlined,
                controller: emailField,
                labelText: 'Email',
                hintText: 'Digite seu email'),
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
                            return LoginPage();
                          }));
                        },
                        style: const ButtonStyle(
                          backgroundColor:
                              WidgetStatePropertyAll(Colors.white12),
                          foregroundColor: WidgetStatePropertyAll(Colors.black),
                        ),
                        child: const Text('Voltar'),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20.0, 0.0, 20.0, 0.0),
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(context,
                              MaterialPageRoute(builder: (context) {
                            return LoginPage();
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
